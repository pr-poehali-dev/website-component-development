"""
Загружает файл в S3. Тело запроса — сам файл (бинарный или base64).
Имя файла и папка передаются в заголовках X-File-Name и X-File-Folder.
Требует заголовок X-Admin-Password совпадающий с секретом ADMIN_PASSWORD.
v2: убраны метаданные (S3 не поддерживает не-ASCII).
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

    # Заголовки могут прийти в любом регистре — нормализуем
    raw_headers = event.get('headers', {})
    headers = {k.lower(): v for k, v in raw_headers.items()}

    password = headers.get('x-admin-password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}
    folder = headers.get('x-file-folder', 'lessons')
    filename = unquote_plus(headers.get('x-file-name', ''))
    content_type = headers.get('content-type', 'application/octet-stream')

    if folder not in ('lessons', 'videos'):
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неверная папка'})}

    print(f"[upload] folder={folder!r} filename={filename!r} content_type={content_type!r} isBase64={event.get('isBase64Encoded')}")

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
    print(f"[upload] SUCCESS key={key!r} bytes={len(file_bytes)} cdn={cdn_url}")

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'url': cdn_url, 'key': key}, ensure_ascii=False),
    }