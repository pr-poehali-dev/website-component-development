import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import EditableText from '@/components/ui/EditableText';

const LIST_MATERIALS_URL = 'https://functions.poehali.dev/634419af-a32b-49a6-a018-a0a56924f3ef';
const UPLOAD_MATERIAL_URL = 'https://functions.poehali.dev/4abf95ed-7c09-4a6b-a6a8-b565fce42a55';
const DELETE_MATERIAL_URL = 'https://functions.poehali.dev/00ee66d9-6422-4be7-9834-2b0f6dfea2fe';

interface Material {
  key: string;
  name: string;
  url: string;
  size: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} КБ`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
}

function ext(name: string) {
  return name.split('.').pop()?.toUpperCase() ?? '';
}

function VideoCard({ item, adminPassword, onDelete, deleting }: { item: Material; adminPassword: string; onDelete: (key: string) => void; deleting: string | null }) {
  const [open, setOpen] = useState(false);
  const isVideo = /\.(mp4|webm|ogv|mov)$/i.test(item.name);
  const label = item.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  return (
    <div className="border overflow-hidden" style={{ borderColor: '#e8dcc8', backgroundColor: '#f5f0e8' }}>
      {isVideo && open ? (
        <video controls autoPlay className="w-full aspect-video bg-black">
          <source src={item.url} />
        </video>
      ) : (
        <div
          className="w-full aspect-video flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: '#1a1410' }}
          onClick={() => isVideo ? setOpen(true) : window.open(item.url, '_blank')}
        >
          <Icon name={isVideo ? 'Play' : 'FileVideo'} fallback="Play" size={36} style={{ color: '#8b6914' }} />
        </div>
      )}
      <div className="p-3 flex items-center justify-between gap-2">
        <p className="text-sm leading-snug flex-1" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{label}</p>
        <a href={item.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}>
          <Icon name="Download" size={14} style={{ color: 'rgba(26,20,16,0.3)' }} />
        </a>
        {adminPassword && (
          <button onClick={() => onDelete(item.key)} disabled={deleting === item.key} title="Удалить">
            <Icon name={deleting === item.key ? 'Loader' : 'Trash2'} size={14} style={{ color: '#c0392b', opacity: deleting === item.key ? 0.5 : 1 }} />
          </button>
        )}
      </div>
    </div>
  );
}

function UploadPanel({ onUploaded, adminPassword, onAuth }: { onUploaded: () => void; adminPassword: string; onAuth: (p: string) => void }) {
  const [open, setOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const authed = adminPassword !== '';
  const [folder, setFolder] = useState<'lessons' | 'videos'>('lessons');
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const checkPassword = async () => {
    const res = await fetch(UPLOAD_MATERIAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': passwordInput },
      body: JSON.stringify({ folder: 'lessons', filename: '', data: '' }),
    });
    if (res.status !== 401) { onAuth(passwordInput); setErrorMsg(''); }
    else { setErrorMsg('Неверный пароль'); }
  };

  const upload = async () => {
    if (!file) return;
    setStatus('uploading');
    const reader = new FileReader();
    reader.onload = async (e) => {
      const b64 = (e.target!.result as string).split(',')[1];
      const res = await fetch(UPLOAD_MATERIAL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
        body: JSON.stringify({ folder, filename: file.name, contentType: file.type, data: b64 }),
      });
      if (res.ok) {
        setStatus('done');
        setFile(null);
        onUploaded();
        setTimeout(() => setStatus('idle'), 2500);
      } else {
        setStatus('error');
        setErrorMsg('Ошибка загрузки');
      }
    };
    reader.readAsDataURL(file);
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 border text-sm transition-all"
        style={{ borderColor: '#8b6914', color: '#8b6914', backgroundColor: 'transparent', fontFamily: 'IBM Plex Sans, sans-serif' }}
      >
        <Icon name="Upload" size={14} />
        Загрузить материал
      </button>
    );
  }

  return (
    <div className="border p-5 space-y-4" style={{ borderColor: '#8b6914', backgroundColor: '#faf7f0' }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>Загрузка материала</p>
        <button onClick={() => { setOpen(false); setPasswordInput(''); setStatus('idle'); }}>
          <Icon name="X" size={16} style={{ color: 'rgba(26,20,16,0.4)' }} />
        </button>
      </div>

      {!authed ? (
        <div className="flex gap-2">
          <input
            type="password"
            placeholder="Пароль администратора"
            value={passwordInput}
            onChange={e => setPasswordInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && checkPassword()}
            className="flex-1 border px-3 py-2 text-sm bg-transparent outline-none"
            style={{ borderColor: '#e8dcc8', color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}
          />
          <button
            onClick={checkPassword}
            className="px-4 py-2 text-sm"
            style={{ backgroundColor: '#8b6914', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            Войти
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            {(['lessons', 'videos'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFolder(f)}
                className="flex-1 py-2 text-sm border transition-all"
                style={{
                  borderColor: '#e8dcc8',
                  backgroundColor: folder === f ? '#8b6914' : 'transparent',
                  color: folder === f ? '#faf7f0' : 'rgba(26,20,16,0.6)',
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {f === 'lessons' ? 'Конспект урока' : 'Видео'}
              </button>
            ))}
          </div>

          <label
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed py-6 cursor-pointer"
            style={{ borderColor: '#e8dcc8' }}
          >
            <Icon name="UploadCloud" size={24} style={{ color: '#8b6914' }} />
            <span className="text-sm" style={{ color: 'rgba(26,20,16,0.5)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {file ? file.name : 'Нажмите или перетащите файл'}
            </span>
            <input type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
          </label>

          {file && status !== 'done' && (
            <button
              onClick={upload}
              disabled={status === 'uploading'}
              className="w-full py-2 text-sm"
              style={{ backgroundColor: '#8b6914', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif', opacity: status === 'uploading' ? 0.6 : 1 }}
            >
              {status === 'uploading' ? 'Загружаю…' : 'Загрузить'}
            </button>
          )}

          {status === 'done' && (
            <p className="text-sm text-center" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>Файл успешно загружен!</p>
          )}
        </>
      )}

      {errorMsg && (
        <p className="text-sm" style={{ color: '#c0392b', fontFamily: 'IBM Plex Sans, sans-serif' }}>{errorMsg}</p>
      )}
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 border flex items-center justify-center flex-shrink-0 mt-1" style={{ borderColor: '#e8dcc8' }}>
        <Icon name={icon} fallback="Circle" size={20} style={{ color: '#8b6914' }} />
      </div>
      <div>
        <h2 className="text-4xl font-semibold leading-tight" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
        <p className="text-sm mt-1 tracking-wide" style={{ color: 'rgba(26,20,16,0.45)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{subtitle}</p>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, editKey, fallback }: { icon: string; title: string; editKey: string; fallback: string }) {
  return (
    <div className="p-5 border" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon name={icon} fallback="Circle" size={14} style={{ color: '#8b6914' }} />
        <h5 className="text-sm font-medium tracking-wide uppercase" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{title}</h5>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <EditableText contentKey={editKey} fallback={fallback} multiline />
      </p>
    </div>
  );
}

export default function AboutDocumentsMethods() {
  const [lessons, setLessons] = useState<Material[]>([]);
  const [videos, setVideos] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminPassword, setAdminPassword] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  const deleteMaterial = async (key: string) => {
    setDeleting(key);
    await fetch(DELETE_MATERIAL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Password': adminPassword },
      body: JSON.stringify({ key }),
    });
    setDeleting(null);
    loadMaterials();
  };

  const loadMaterials = () => {
    setLoading(true);
    fetch(LIST_MATERIALS_URL)
      .then(r => r.json())
      .then(data => {
        setLessons(data.lessons ?? []);
        setVideos(data.videos ?? []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadMaterials(); }, []);

  return (
    <>
      {/* ── О ПЕДАГОГЕ ── */}
      <section id="about" className="py-20 px-6 border-t" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon="UserRound" title="О педагоге" subtitle="Визитная карточка" />
          <div className="grid md:grid-cols-3 gap-12 mt-12">
            <div className="md:col-span-1">
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden border-2" style={{ borderColor: '#e8dcc8' }}>
                  <img
                    src="https://cdn.poehali.dev/projects/d7a5404b-4e2f-49ba-bacd-62605f3446dc/bucket/2aadb9a4-3e8b-48e5-a8b0-1266bce3437f.jpeg"
                    alt="Вышиденко Вероника Владимировна"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 border p-3" style={{ borderColor: '#8b6914', backgroundColor: '#faf7f0' }}>
                  <p className="italic text-sm" style={{ color: '#8b6914', fontFamily: 'Cormorant Garamond, serif' }}>
                    <EditableText contentKey="about.motto" fallback="«Книга — корабль мысли»" />
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-3xl font-semibold mb-1" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                  <EditableText contentKey="about.name" fallback="Вероника Владимировна Вышиденко" />
                </h3>
                <p className="text-sm tracking-wide" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  <EditableText contentKey="about.position" fallback="Учитель русского языка и литературы · Заместитель директора по УВР · Стаж 5 лет" />
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <InfoBlock icon="GraduationCap" title="Образование" editKey="about.education" fallback="АлтГПУ, Русский язык и литература, 2020 г. · Магистр, 2022 г." />
                <InfoBlock icon="Award" title="Категория и аттестация" editKey="about.category" fallback="Первая квалификационная категория. Аттестация — 2023 г." />
                <InfoBlock icon="BookMarked" title="Повышение квалификации" editKey="about.courses" fallback="ФГБНУ «Федеральный институт родных языков» · КАУ ДПО «АИРО им. А.М. Топорова» · ФГБНУ «Институт содержания и методов обучения» · ФГАОУ ВО «Государственный университет просвещения»" />
                <InfoBlock icon="Star" title="Награды" editKey="about.awards" fallback="Почётная грамота главы Романовского района · Почётная грамота комитета по образованию Романовского муниципалитета" />
              </div>
              <div className="border-l-2 pl-6" style={{ borderColor: '#8b6914' }}>
                <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1a1410' }}>Профессиональное кредо</h4>
                <p className="leading-relaxed italic text-sm" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  <EditableText contentKey="about.credo" fallback="«Мой главный принцип — воспитать не просто грамотного человека, но и любящего читателя, способного чувствовать красоту слова и думать самостоятельно.»" multiline />
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1a1410' }}>Увлечения</h4>
                <div className="flex flex-wrap gap-2">
                  {['Классическая литература', 'Театр', 'Каллиграфия', 'Краеведение', 'Солистка народного ансамбля «Элегия»'].map(h => (
                    <span key={h} className="px-3 py-1 text-sm border" style={{ backgroundColor: 'rgba(232,220,200,0.4)', borderColor: '#e8dcc8', color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── НОРМАТИВНЫЕ ДОКУМЕНТЫ ── */}
      <section id="documents" className="py-20 px-6 border-t" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
        <div className="max-w-6xl mx-auto">
          <SectionTitle icon="FileText" title="Нормативные документы" subtitle="Программы и планирование" />
          <div className="grid md:grid-cols-2 gap-4 mt-12">
            {[
              { name: 'Рабочая программа по русскому языку 5–9 класс', type: 'PDF', size: '1.2 МБ', year: '2025–2026' },
              { name: 'Рабочая программа по литературе 5–11 класс', type: 'PDF', size: '1.8 МБ', year: '2025–2026' },
              { name: 'Тематическое планирование. Русский язык', type: 'DOCX', size: '430 КБ', year: '2025–2026' },
              { name: 'Тематическое планирование. Литература', type: 'DOCX', size: '510 КБ', year: '2025–2026' },
              { name: 'Устав образовательного учреждения', type: 'PDF', size: '890 КБ', year: '2024' },
              { name: 'Положение о предметной неделе', type: 'PDF', size: '210 КБ', year: '2025' },
              { name: 'Документы НОУ', type: 'ZIP', size: '3.4 МБ', year: '2025' },
              { name: 'Примерная программа по русскому языку ФГОС', type: 'PDF', size: '2.1 МБ', year: '2024' },
            ].map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-4 border cursor-pointer group transition-all" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(232,220,200,0.5)' }}>
                    <Icon name="FileText" size={18} style={{ color: '#8b6914' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{doc.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{doc.type} · {doc.size} · {doc.year} уч. год</p>
                  </div>
                </div>
                <Icon name="Download" size={16} style={{ color: 'rgba(26,20,16,0.25)', flexShrink: 0, marginLeft: 16 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── МЕТОДИЧЕСКАЯ КОПИЛКА ── */}
      <section id="methods" className="py-20 px-6 border-t" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <SectionTitle icon="BookOpen" title="Методическая копилка" subtitle="Уроки и внеурочная работа" />
            <UploadPanel onUploaded={loadMaterials} adminPassword={adminPassword} onAuth={setAdminPassword} />
          </div>

          {loading && (
            <div className="mt-12 text-center py-12" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Загрузка материалов…
            </div>
          )}

          {!loading && lessons.length === 0 && videos.length === 0 && (
            <div className="mt-12 text-center py-12" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              Материалы пока не загружены. Добавьте файлы в папки <strong>lessons/</strong> и <strong>videos/</strong> в хранилище.
            </div>
          )}

          {!loading && (lessons.length > 0 || videos.length > 0) && (
            <div className="mt-12 space-y-12">

              {lessons.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                    <Icon name="BookMarked" size={20} style={{ color: '#8b6914' }} />
                    Конспекты уроков
                  </h3>
                  <div className="space-y-3">
                    {lessons.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-4 p-3 border transition-all"
                        style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}
                      >
                        <Icon name="FileText" fallback="FileText" size={16} style={{ color: '#8b6914', flexShrink: 0 }} />
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            {item.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}
                          </p>
                          <p className="text-xs" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                            {ext(item.name)} · {formatSize(item.size)}
                          </p>
                        </div>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          <Icon name="Download" size={14} style={{ color: 'rgba(26,20,16,0.2)' }} />
                        </a>
                        {adminPassword && (
                          <button
                            onClick={() => deleteMaterial(item.key)}
                            disabled={deleting === item.key}
                            title="Удалить"
                          >
                            <Icon name={deleting === item.key ? 'Loader' : 'Trash2'} size={14} style={{ color: '#c0392b', opacity: deleting === item.key ? 0.5 : 1 }} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {videos.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                    <Icon name="Video" size={20} style={{ color: '#8b6914' }} />
                    Видеоматериалы
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((item) => (
                      <VideoCard key={item.key} item={item} adminPassword={adminPassword} onDelete={deleteMaterial} deleting={deleting} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Статичная часть — внеклассная работа */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                <Icon name="BookMarked" size={20} style={{ color: '#8b6914' }} />
                Урочная деятельность
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Конспект урока «Причастный оборот»', cls: '7 класс', icon: 'FileText' },
                  { title: 'Презентация «Серебряный век»', cls: '11 класс', icon: 'Presentation' },
                  { title: 'ЦОР: Орфограммы в корне слова', cls: '6 класс', icon: 'Monitor' },
                  { title: 'Разработка «Слово о полку Игореве»', cls: '9 класс', icon: 'Scroll' },
                  { title: 'Карточки для групповой работы (ЕГЭ)', cls: '11 класс', icon: 'LayoutGrid' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border cursor-pointer transition-all group" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
                    <Icon name={item.icon} fallback="FileText" size={16} style={{ color: '#8b6914', flexShrink: 0 }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{item.cls}</p>
                    </div>
                    <Icon name="Download" size={14} style={{ color: 'rgba(26,20,16,0.2)' }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                <Icon name="Users" size={20} style={{ color: '#8b6914' }} />
                Внеклассная работа
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Программа кружка «Юный журналист»', cls: '7–9 класс', icon: 'PenLine' },
                  { title: 'Работа с одарёнными: олимпиадные задания', cls: '8–11 класс', icon: 'Lightbulb' },
                  { title: 'Отчёт «Предметная неделя 2025»', cls: '', icon: 'ClipboardList' },
                  { title: 'Сценарий «Пушкинский вечер»', cls: '10–11 класс', icon: 'Drama' },
                  { title: 'Материалы для НОУ по литературоведению', cls: '9–11 класс', icon: 'FlaskConical' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border cursor-pointer transition-all group" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
                    <Icon name={item.icon} fallback="FileText" size={16} style={{ color: '#8b6914', flexShrink: 0 }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{item.cls}</p>
                    </div>
                    <Icon name="Download" size={14} style={{ color: 'rgba(26,20,16,0.2)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}