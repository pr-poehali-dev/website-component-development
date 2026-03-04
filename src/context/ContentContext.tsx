import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const GET_URL = 'https://functions.poehali.dev/8930dda9-347f-46fd-8812-2931fe8ba1a2';
const SAVE_URL = 'https://functions.poehali.dev/59349ece-fb82-4c4f-b3e7-8e534a6f53e5';

interface ContentCtx {
  content: Record<string, string>;
  adminPassword: string;
  setAdminPassword: (p: string) => void;
  getText: (key: string, fallback: string) => string;
  saveText: (key: string, value: string) => Promise<boolean>;
}

const Ctx = createContext<ContentCtx>({
  content: {},
  adminPassword: '',
  setAdminPassword: () => {},
  getText: (_, fb) => fb,
  saveText: async () => false,
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Record<string, string>>({});
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    fetch(GET_URL)
      .then(r => r.json())
      .then(data => setContent(data))
      .catch(() => {});
  }, []);

  const getText = (key: string, fallback: string) => content[key] ?? fallback;

  const saveText = async (key: string, value: string) => {
    const res = await fetch(SAVE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
      body: JSON.stringify({ key, value }),
    });
    if (res.ok) {
      setContent(prev => ({ ...prev, [key]: value }));
      return true;
    }
    return false;
  };

  return (
    <Ctx.Provider value={{ content, adminPassword, setAdminPassword, getText, saveText }}>
      {children}
    </Ctx.Provider>
  );
}

export const useContent = () => useContext(Ctx);
