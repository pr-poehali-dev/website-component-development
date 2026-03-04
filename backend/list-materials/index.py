"""
Возвращает список файлов из S3-хранилища по папкам: конспекты (lessons/) и видео (videos/).
"""
import os
import boto3
import json


CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    key_id = os.environ['AWS_ACCESS_KEY_ID']
    base_cdn = f"https://cdn.poehali.dev/projects/{key_id}/bucket"

    def list_folder(prefix: str) -> list:
        result = []
        paginator = s3.get_paginator('list_objects_v2')
        for page in paginator.paginate(Bucket='files', Prefix=prefix):
            for obj in page.get('Contents', []):
                key = obj['Key']
                name = key.split('/')[-1]
                if not name:
                    continue
                result.append({
                    'key': key,
                    'name': name,
                    'url': f"{base_cdn}/{key}",
                    'size': obj['Size'],
                })
        return result

    lessons = list_folder('lessons/')
    videos = list_folder('videos/')

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'lessons': lessons, 'videos': videos}),
    }