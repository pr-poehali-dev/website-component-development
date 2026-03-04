"""
Удаляет файл из S3 по ключу (key).
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
    key = body.get('key', '')

    if not key or not (key.startswith('lessons/') or key.startswith('videos/')):
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Неверный ключ'})}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )
    s3.delete_object(Bucket='files', Key=key)

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'deleted': key}),
    }
