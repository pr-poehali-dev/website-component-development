"""
Загружает файл в S3. Тело запроса — сам файл (бинарный или base64).
Имя файла и папка передаются в заголовках X-File-Name и X-File-Folder.
Требует заголовок X-Admin-Password совпадающий с секретом ADMIN_PASSWORD.
"""
import os
import json
import base64
import boto3
from urllib.parse import unquote_plus


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password, X-File-Name, X-File-Folder',
}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    password = event.get('headers', {}).get('X-Admin-Password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

    headers = event.get('headers', {})
    folder = headers.get('X-File-Folder', 'lessons')
    filename = unquote_plus(headers.get('X-File-Name', ''))
    content_type = headers.get('Content-Type', 'application/octet-stream')

    if folder not in ('lessons', 'videos'):
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неверная папка'})}

    if not filename:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет имени файла'})}

    raw_body = event.get('body', '')
    if event.get('isBase64Encoded'):
        file_bytes = base64.b64decode(raw_body)
    else:
        file_bytes = raw_body.encode('utf-8') if isinstance(raw_body, str) else raw_body

    # Безопасное имя ключа (пробелы → подчёркивания)
    safe_name = filename.replace(' ', '_')
    key = f"{folder}/{safe_name}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(
        Bucket='files',
        Key=key,
        Body=file_bytes,
        ContentType=content_type,
    )

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    cdn_url = f"https://cdn.poehali.dev/projects/{key_id}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'url': cdn_url, 'key': key}, ensure_ascii=False),
    }