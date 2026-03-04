"""
Генерирует presigned URL для прямой загрузки файла в S3 (обходит лимит 1 МБ на тело запроса).
Требует заголовок X-Admin-Password совпадающий с секретом ADMIN_PASSWORD.
"""
import os
import json
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

    if folder not in ('lessons', 'videos'):
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неверная папка'})}

    if not filename:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет имени файла'})}

    key = f"{folder}/{filename}"
    key_id = os.environ['AWS_ACCESS_KEY_ID']

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=key_id,
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    presigned_url = s3.generate_presigned_url(
        'put_object',
        Params={'Bucket': 'files', 'Key': key, 'ContentType': content_type},
        ExpiresIn=300,
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{key_id}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'uploadUrl': presigned_url, 'cdnUrl': cdn_url, 'key': key}),
    }
