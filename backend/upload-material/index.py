"""
Загружает файл (base64) в S3 в папку lessons/ или videos/.
Требует заголовок X-Admin-Password совпадающий с секретом ADMIN_PASSWORD.
"""
import os
import json
import base64
import boto3


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    password = event.get('headers', {}).get('X-Admin-Password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

    body = json.loads(event.get('body') or '{}')
    folder = body.get('folder', 'lessons')
    filename = body.get('filename', '')
    content_type = body.get('contentType', 'application/octet-stream')
    data_b64 = body.get('data', '')

    if folder not in ('lessons', 'videos'):
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неверная папка'})}

    if not filename or not data_b64:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет файла'})}

    file_bytes = base64.b64decode(data_b64)
    key = f"{folder}/{filename}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.put_object(Bucket='files', Key=key, Body=file_bytes, ContentType=content_type)

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    url = f"https://cdn.poehali.dev/projects/{key_id}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'url': url, 'key': key}),
    }
