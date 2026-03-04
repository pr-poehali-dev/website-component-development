"""
Сохраняет или обновляет текстовый блок по ключу.
Требует заголовок X-Admin-Password.
"""
import os
import json
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 'public')


def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    password = event.get('headers', {}).get('X-Admin-Password', '')
    if password != os.environ.get('ADMIN_PASSWORD', ''):
        return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}

    body = json.loads(event.get('body') or '{}')
    key = body.get('key', '').strip()
    value = body.get('value', '')

    if not key:
        return {'statusCode': 400, 'headers': CORS, 'body': json.dumps({'error': 'Нет ключа'})}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f'''INSERT INTO {SCHEMA}.site_content (key, value, updated_at)
            VALUES (%s, %s, now())
            ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()''',
        (key, value)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps({'saved': key}, ensure_ascii=False),
    }
