import { useState, useRef, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import Icon from '@/components/ui/icon';

interface Props {
  contentKey: string;
  fallback: string;
  multiline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function EditableText({ contentKey, fallback, multiline = false, className, style }: Props) {
  const { getText, saveText, adminPassword } = useContent();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = getText(contentKey, fallback);

  useEffect(() => {
    if (editing) {
      setValue(current);
      setTimeout(() => { textareaRef.current?.focus(); inputRef.current?.focus(); }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const save = async () => {
    setSaving(true);
    const ok = await saveText(contentKey, value);
    setSaving(false);
    if (ok) { setFlash(true); setTimeout(() => setFlash(false), 1200); setEditing(false); }
  };

  const cancel = () => setEditing(false);

  if (!adminPassword) {
    return <span className={className} style={style}>{current}</span>;
  }

  if (editing) {
    return (
      <span className="inline-flex flex-col gap-1 w-full">
        {multiline ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            rows={4}
            className="w-full border px-2 py-1 text-sm resize-y outline-none"
            style={{ borderColor: '#8b6914', fontFamily: 'inherit', fontSize: 'inherit', color: '#1a1410', backgroundColor: '#fffdf7' }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') cancel(); }}
            className="w-full border px-2 py-1 text-sm outline-none"
            style={{ borderColor: '#8b6914', fontFamily: 'inherit', fontSize: 'inherit', color: '#1a1410', backgroundColor: '#fffdf7' }}
          />
        )}
        <span className="flex gap-2">
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1 px-2 py-0.5 text-xs"
            style={{ backgroundColor: '#8b6914', color: '#fff' }}
          >
            <Icon name={saving ? 'Loader' : 'Check'} size={11} />
            {saving ? 'Сохраняю…' : 'Сохранить'}
          </button>
          <button onClick={cancel} className="flex items-center gap-1 px-2 py-0.5 text-xs" style={{ backgroundColor: 'transparent', color: 'rgba(26,20,16,0.5)', border: '1px solid #e8dcc8' }}>
            <Icon name="X" size={11} />
            Отмена
          </button>
        </span>
      </span>
    );
  }

  return (
    <span
      className={className}
      style={{ ...style, cursor: 'pointer', outline: flash ? '2px solid #8b6914' : '1px dashed rgba(139,105,20,0.35)', outlineOffset: 2 }}
      title="Нажмите, чтобы редактировать"
      onClick={() => setEditing(true)}
    >
      {current}
    </span>
  );
}