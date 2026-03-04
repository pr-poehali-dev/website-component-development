"""
Возвращает все текстовые блоки сайта из БД в виде словаря {key: value}.
"""
import os
import json
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(f'SELECT key, value FROM {SCHEMA}.site_content')
    rows = cur.fetchall()
    cur.close()
    conn.close()

    content = {row[0]: row[1] for row in rows}

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(content, ensure_ascii=False),
    }
