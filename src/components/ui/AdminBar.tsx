import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import Icon from '@/components/ui/icon';

const SAVE_URL = 'https://functions.poehali.dev/59349ece-fb82-4c4f-b3e7-8e534a6f53e5';

export default function AdminBar() {
  const { adminPassword, setAdminPassword } = useContent();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    const res = await fetch(SAVE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': input },
      body: JSON.stringify({ key: '__check__', value: '1' }),
    });
    if (res.ok || res.status !== 401) {
      setAdminPassword(input);
      setOpen(false);
      setError('');
      setInput('');
    } else {
      setError('Неверный пароль');
    }
  };

  const logout = () => { setAdminPassword(''); setInput(''); };

  if (adminPassword) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-2 shadow-lg"
        style={{ backgroundColor: '#1a1410', color: '#e8dcc8', fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 13 }}
      >
        <Icon name="Pencil" size={13} style={{ color: '#8b6914' }} />
        <span>Режим редактирования</span>
        <button onClick={logout} className="flex items-center gap-1 opacity-60 hover:opacity-100">
          <Icon name="LogOut" size={13} />
          Выйти
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 shadow-lg text-xs"
        style={{ backgroundColor: '#1a1410', color: '#e8dcc8', fontFamily: 'IBM Plex Sans, sans-serif' }}
        title="Войти как администратор"
      >
        <Icon name="Pencil" size={13} style={{ color: '#8b6914' }} />
        Редактировать сайт
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="p-6 space-y-4 w-80" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8', border: '1px solid' }}>
            <div className="flex items-center justify-between">
              <p className="font-medium" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#1a1410' }}>Вход в редактор</p>
              <button onClick={() => setOpen(false)}><Icon name="X" size={16} style={{ color: 'rgba(26,20,16,0.4)' }} /></button>
            </div>
            <input
              type="password"
              placeholder="Пароль"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              autoFocus
              className="w-full border px-3 py-2 text-sm outline-none bg-transparent"
              style={{ borderColor: '#e8dcc8', color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}
            />
            {error && <p className="text-xs" style={{ color: '#c0392b' }}>{error}</p>}
            <button
              onClick={login}
              className="w-full py-2 text-sm"
              style={{ backgroundColor: '#8b6914', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              Войти
            </button>
          </div>
        </div>
      )}
    </>
  );
}
