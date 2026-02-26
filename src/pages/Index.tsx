import { useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О педагоге' },
  { id: 'documents', label: 'Документы' },
  { id: 'methods', label: 'Методическая копилка' },
  { id: 'students', label: 'Учащимся' },
  { id: 'achievements', label: 'Достижения' },
  { id: 'gallery', label: 'Фотогалерея' },
  { id: 'contact', label: 'Контакты' },
];

const TESTS = [
  {
    id: 1,
    title: 'Знаки препинания при обращении',
    level: '8–9 класс',
    questions: [
      {
        q: 'Укажите предложение, в котором обращение выделено запятыми верно.',
        options: ['Петя, иди сюда.', 'Петя иди, сюда.', 'Петя иди сюда,.', ',Петя иди сюда.'],
        answer: 0,
      },
      {
        q: 'Найдите предложение с обращением.',
        options: ['Ветер гнал листья по дороге.', 'Ветер, как ты силён сегодня!', 'Сегодня ветреная погода.', 'Листья кружились в вихре.'],
        answer: 1,
      },
      {
        q: 'Как называется синтаксическая конструкция, называющая того, к кому обращаются?',
        options: ['Подлежащее', 'Дополнение', 'Обращение', 'Сказуемое'],
        answer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Части речи. Закрепление',
    level: '5–6 класс',
    questions: [
      {
        q: 'Какой частью речи является слово «бегать»?',
        options: ['Существительное', 'Прилагательное', 'Глагол', 'Наречие'],
        answer: 2,
      },
      {
        q: 'Укажите имя прилагательное.',
        options: ['Синева', 'Синий', 'Синеть', 'Синевато'],
        answer: 1,
      },
      {
        q: 'Какое слово является наречием?',
        options: ['Быстрый', 'Быстро', 'Быстрота', 'Быстрить'],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'Подготовка к ОГЭ: сжатое изложение',
    level: '9 класс',
    questions: [
      {
        q: 'Что НЕ является приёмом сжатия текста?',
        options: ['Исключение', 'Обобщение', 'Упрощение', 'Цитирование'],
        answer: 3,
      },
      {
        q: 'Сколько абзацев должно быть в сжатом изложении на ОГЭ?',
        options: ['1', '2', '3', '5'],
        answer: 2,
      },
      {
        q: 'Минимальное количество слов в изложении ОГЭ:',
        options: ['50', '70', '100', '150'],
        answer: 1,
      },
    ],
  },
];

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80', caption: 'Урок литературы, 9А класс' },
  { src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=80', caption: 'Предметная неделя' },
  { src: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80', caption: 'Школьная библиотека' },
  { src: 'https://images.unsplash.com/photo-1491841651911-c44484b7b7cc?w=400&q=80', caption: 'Олимпиада по русскому языку' },
  { src: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&q=80', caption: 'Классный час' },
  { src: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&q=80', caption: 'Конкурс чтецов' },
];

const NEWS = [
  { date: '20 февраля 2026', title: 'Олимпиада по русскому языку', text: 'Поздравляем победителей городской олимпиады! Трое учеников вышли в региональный тур.' },
  { date: '10 февраля 2026', title: 'Литературный вечер', text: 'Прошёл вечер памяти А.С. Пушкина. Ученики 8–11 классов читали стихи и прозу.' },
  { date: '1 февраля 2026', title: 'Открытый урок', text: 'Приглашаем коллег на открытый урок по теме «Сложные синтаксические конструкции» — 5 марта.' },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [testDone, setTestDone] = useState(false);

  const startTest = (testId: number) => {
    setActiveTest(testId);
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setTestDone(false);
  };

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
  };

  const nextQuestion = () => {
    const test = TESTS.find(t => t.id === activeTest)!;
    const newAnswers = [...answers, selected];
    if (currentQ + 1 >= test.questions.length) {
      setAnswers(newAnswers);
      setTestDone(true);
    } else {
      setAnswers(newAnswers);
      setCurrentQ(currentQ + 1);
      setSelected(null);
    }
  };

  const getScore = () => {
    const test = TESTS.find(t => t.id === activeTest)!;
    return answers.filter((a, i) => a === test.questions[i].answer).length;
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <div className="min-h-screen font-ibm text-ink" style={{ backgroundColor: '#f5f0e8' }}>
      {/* Grain texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ backgroundColor: 'rgba(250,247,240,0.96)', borderColor: '#e8dcc8', backdropFilter: 'blur(8px)' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3">
            <span className="text-2xl" style={{ color: '#c4a44a', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>✦</span>
            <div className="text-left">
              <div className="font-semibold text-lg leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1a1410' }}>Вероника Владимировна</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>Русский язык · Литература</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 text-sm transition-all rounded"
                style={{
                  color: activeSection === item.id ? '#8b6914' : 'rgba(26,20,16,0.65)',
                  fontWeight: activeSection === item.id ? 500 : 400,
                  fontFamily: 'IBM Plex Sans, sans-serif',
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: '#1a1410' }}>
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-3 flex flex-col gap-1 border-t" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-3 py-2 text-sm rounded transition-all"
                style={{ color: activeSection === item.id ? '#8b6914' : 'rgba(26,20,16,0.65)' }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="pt-16 relative z-10">

        {/* ── ГЛАВНАЯ ── */}
        <section id="home">
          {/* Hero */}
          <div className="relative overflow-hidden flex items-center min-h-[90vh]" style={{ backgroundColor: '#2d1f0e' }}>
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #c4a44a 39px, #c4a44a 40px)',
            }} />
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 600'%3E%3Cpath d='M200 30 Q260 80 240 140 Q220 200 260 260 Q300 320 250 380 Q200 440 240 500 Q260 550 200 580' stroke='%23c4a44a' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: '500px 100%',
            }} />

            <div className="max-w-6xl mx-auto px-6 py-24 w-full">
              <div className="max-w-2xl opacity-0 animate-fade-in">
                <div className="text-xl mb-4 tracking-wide italic" style={{ color: '#c4a44a', fontFamily: 'Cormorant Garamond, serif' }}>
                  Добро пожаловать
                </div>
                <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6" style={{ color: '#faf7f0', fontFamily: 'Cormorant Garamond, serif' }}>
                  Мир<br />
                  <em className="font-normal" style={{ color: '#c4a44a' }}>слова и</em><br />
                  литературы
                </h1>
                <p className="text-lg leading-relaxed mb-10 font-light" style={{ color: 'rgba(250,247,240,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  Персональный сайт учителя русского языка и литературы МБОУ «Закладинская СОШ».
                  Здесь вы найдёте учебные материалы, интерактивные задания и всё необходимое для успешной учёбы.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollTo('students')}
                    className="px-6 py-3 text-sm tracking-wide transition-all duration-300"
                    style={{ backgroundColor: '#8b6914', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    Материалы для учащихся
                  </button>
                  <button
                    onClick={() => scrollTo('about')}
                    className="px-6 py-3 text-sm tracking-wide transition-all duration-300 border"
                    style={{ borderColor: 'rgba(250,247,240,0.25)', color: 'rgba(250,247,240,0.75)', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    О педагоге
                  </button>
                </div>
              </div>

              <div className="absolute right-10 bottom-14 max-w-xs text-right hidden xl:block opacity-0 animate-fade-in-d4">
                <p className="italic text-2xl leading-snug" style={{ color: 'rgba(250,247,240,0.35)', fontFamily: 'Cormorant Garamond, serif' }}>
                  «Чтение — вот лучшее учение»
                </p>
                <span className="text-xs tracking-widest uppercase mt-2 block" style={{ color: 'rgba(196,164,74,0.55)', fontFamily: 'IBM Plex Sans, sans-serif' }}>А.С. Пушкин</span>
              </div>
            </div>
          </div>

          {/* News */}
          <div className="py-16 px-6" style={{ backgroundColor: '#faf7f0' }}>
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                <span className="text-3xl" style={{ color: '#8b6914', fontFamily: 'Cormorant Garamond, serif' }}>✦</span>
                <h2 className="text-3xl font-semibold" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>Новости и анонсы</h2>
                <div className="flex-1 border-t ml-4" style={{ borderColor: '#e8dcc8' }} />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {NEWS.map((n, i) => (
                  <div key={i} className="p-6 border transition-colors group" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
                    <div className="text-xs tracking-widest uppercase mb-2" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{n.date}</div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{n.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,20,16,0.58)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section guide */}
          <div className="py-14 px-6 border-t" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl text-center font-light italic mb-8" style={{ color: 'rgba(26,20,16,0.4)', fontFamily: 'Cormorant Garamond, serif' }}>Разделы сайта</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {NAV_ITEMS.slice(1).map((item, i) => {
                  const icons = ['UserRound', 'FileText', 'BookOpen', 'GraduationCap', 'Trophy', 'Image', 'Mail'];
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex flex-col items-center gap-2 p-5 border transition-all group text-center"
                      style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}
                    >
                      <Icon name={icons[i] || 'Circle'} size={20} style={{ color: '#8b6914' }} />
                      <span className="text-sm" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── О ПЕДАГОГЕ ── */}
        <section id="about" className="py-20 px-6 border-t" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon="UserRound" title="О педагоге" subtitle="Визитная карточка" />
            <div className="grid md:grid-cols-3 gap-12 mt-12">
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="aspect-[3/4] overflow-hidden border-2" style={{ borderColor: '#e8dcc8' }}>
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                      alt="Учитель"
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(15%) sepia(10%)' }}
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 border p-3" style={{ borderColor: '#8b6914', backgroundColor: '#faf7f0' }}>
                    <p className="italic text-sm" style={{ color: '#8b6914', fontFamily: 'Cormorant Garamond, serif' }}>«Книга — корабль мысли»</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-3xl font-semibold mb-1" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>Вероника Владимировна Вышиденко</h3>
                  <p className="text-sm tracking-wide" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>Учитель русского языка и литературы · Заместитель директора по УВР · Стаж 5 лет</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <InfoBlock icon="GraduationCap" title="Образование" text="АлтГПУ, Русский язык и литература, 2020 г. · Магистр, 2022 г." />
                  <InfoBlock icon="Award" title="Категория и аттестация" text="Первая квалификационная категория. Аттестация — 2023 г." />
                  <InfoBlock icon="BookMarked" title="Повышение квалификации" text="ФГБНУ «Федеральный институт родных языков» · КАУ ДПО «АИРО им. А.М. Топорова» · ФГБНУ «Институт содержания и методов обучения» · ФГАОУ ВО «Государственный университет просвещения»" />
                  <InfoBlock icon="Star" title="Награды" text="Почётная грамота главы Романовского района · Почётная грамота комитета по образованию Романовского муниципалитета" />
                </div>
                <div className="border-l-2 pl-6" style={{ borderColor: '#8b6914' }}>
                  <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#1a1410' }}>Профессиональное кредо</h4>
                  <p className="leading-relaxed italic text-sm" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    «Мой главный принцип — воспитать не просто грамотного человека, но и любящего читателя, способного чувствовать красоту слова и думать самостоятельно.»
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
            <SectionTitle icon="BookOpen" title="Методическая копилка" subtitle="Уроки и внеурочная работа" />
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

        {/* ── В ПОМОЩЬ УЧАЩИМСЯ ── */}
        <section id="students" className="py-20 px-6 border-t" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon="GraduationCap" title="В помощь учащимся" subtitle="Задания, тесты, материалы для подготовки" />

            {!activeTest ? (
              <div className="mt-12 space-y-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                    <Icon name="ClipboardCheck" size={20} style={{ color: '#8b6914' }} />
                    Интерактивные тесты
                  </h3>
                  <div className="grid md:grid-cols-3 gap-5">
                    {TESTS.map(test => (
                      <div key={test.id} className="border p-6 transition-all" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
                        <div className="w-8 h-8 flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(139,105,20,0.1)' }}>
                          <Icon name="PenSquare" size={16} style={{ color: '#8b6914' }} />
                        </div>
                        <h4 className="text-xl font-semibold mb-1" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{test.title}</h4>
                        <p className="text-xs mb-4" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{test.level} · {test.questions.length} вопроса</p>
                        <button
                          onClick={() => startTest(test.id)}
                          className="w-full py-2.5 text-sm border transition-all"
                          style={{ backgroundColor: 'rgba(139,105,20,0.08)', borderColor: 'rgba(139,105,20,0.3)', color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}
                        >
                          Пройти тест
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>
                    <Icon name="Library" size={20} style={{ color: '#8b6914' }} />
                    Материалы для подготовки к экзаменам
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: 'ОГЭ: сборник заданий по русскому языку', tag: 'ОГЭ', icon: 'FileDown' },
                      { title: 'ЕГЭ: тренировочные варианты 2025–2026', tag: 'ЕГЭ', icon: 'FileDown' },
                      { title: 'Видеолекция: Сочинение-рассуждение', tag: 'Видео', icon: 'PlayCircle' },
                      { title: 'Шаблоны: Анализ лирического произведения', tag: 'Шаблон', icon: 'FileText' },
                      { title: 'Ссылки на электронные библиотеки', tag: 'Ресурсы', icon: 'ExternalLink' },
                      { title: 'Олимпиадные задания прошлых лет', tag: 'Олимпиада', icon: 'Trophy' },
                    ].map((r, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border cursor-pointer transition-all" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
                        <Icon name={r.icon} fallback="FileText" size={18} style={{ color: '#8b6914', flexShrink: 0 }} />
                        <p className="text-sm flex-1" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{r.title}</p>
                        <span className="text-xs px-2 py-0.5 flex-shrink-0" style={{ backgroundColor: 'rgba(139,105,20,0.1)', color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{r.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <TestModal
                test={TESTS.find(t => t.id === activeTest)!}
                currentQ={currentQ}
                selected={selected}
                testDone={testDone}
                answers={answers}
                score={testDone ? getScore() : 0}
                onAnswer={handleAnswer}
                onNext={nextQuestion}
                onClose={() => setActiveTest(null)}
              />
            )}
          </div>
        </section>

        {/* ── ДОСТИЖЕНИЯ ── */}
        <section id="achievements" className="py-20 px-6 border-t" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon="Trophy" title="Достижения учащихся" subtitle="Конкурсы, олимпиады, проекты" />
            <div className="mt-12 grid md:grid-cols-3 gap-6 mb-12">
              {[
                { name: 'Коваленко Алина, 10А', place: '1 место', event: 'Городская олимпиада по русскому языку 2025', icon: 'Medal' },
                { name: 'Иванов Дмитрий, 9Б', place: '2 место', event: 'Региональная олимпиада по литературе 2025', icon: 'Award' },
                { name: 'Петрова Мария, 11А', place: 'Призёр', event: 'Всероссийский конкурс сочинений «Моя страна»', icon: 'Star' },
                { name: 'Сидоров Павел, 8В', place: '1 место', event: 'Конкурс чтецов «Живая классика»', icon: 'Mic' },
                { name: 'Литвинова Настя, 7А', place: 'Победитель', event: 'Школьный конкурс исследовательских работ', icon: 'FlaskConical' },
                { name: 'Команда 10–11 классов', place: '2 место', event: 'Межшкольная литературная викторина', icon: 'Users' },
              ].map((a, i) => (
                <div key={i} className="p-5 border transition-all" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(139,105,20,0.1)' }}>
                      <Icon name={a.icon} fallback="Award" size={16} style={{ color: '#8b6914' }} />
                    </div>
                    <div>
                      <div className="text-xs tracking-wide uppercase mb-1" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{a.place}</div>
                      <div className="text-lg font-semibold" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{a.name}</div>
                      <div className="text-xs mt-1 leading-relaxed" style={{ color: 'rgba(26,20,16,0.45)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{a.event}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-10" style={{ borderColor: '#e8dcc8' }}>
              <h3 className="text-2xl font-semibold mb-6" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>Работы учащихся</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Исследовательская работа «Образ природы в лирике Есенина»', author: 'Коваленко А., 10А' },
                  { title: 'Сочинение «Тема судьбы в романе Толстого»', author: 'Иванов Д., 9Б' },
                  { title: 'Проект «Диалектные слова нашего региона»', author: 'Литвинова Н., 7А' },
                  { title: 'Эссе «Почему я люблю читать»', author: 'Петрова М., 11А' },
                ].map((w, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border cursor-pointer transition-all" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
                    <Icon name="ScrollText" size={16} style={{ color: '#8b6914', flexShrink: 0 }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}>{w.title}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{w.author}</p>
                    </div>
                    <Icon name="ExternalLink" size={14} style={{ color: 'rgba(26,20,16,0.2)' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ФОТОГАЛЕРЕЯ ── */}
        <section id="gallery" className="py-20 px-6 border-t" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
          <div className="max-w-6xl mx-auto">
            <SectionTitle icon="Image" title="Фотогалерея" subtitle="Уроки, мероприятия, события" />
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {GALLERY.map((photo, i) => (
                <div key={i} className="group relative overflow-hidden border transition-all" style={{ borderColor: '#e8dcc8' }}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      style={{ filter: 'grayscale(15%)' }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: 'linear-gradient(to top, rgba(45,31,14,0.7), transparent)' }}>
                    <p className="text-xs px-3 py-2" style={{ color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}>{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── КОНТАКТЫ ── */}
        <section id="contact" className="py-20 px-6 border-t" style={{ backgroundColor: '#2d1f0e', borderColor: '#3d2a0e' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="text-3xl" style={{ color: '#c4a44a', fontFamily: 'Cormorant Garamond, serif' }}>✦</span>
              <h2 className="text-4xl font-semibold" style={{ color: '#faf7f0', fontFamily: 'Cormorant Garamond, serif' }}>Контакты и обратная связь</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl italic" style={{ color: '#faf7f0', fontFamily: 'Cormorant Garamond, serif' }}>Свяжитесь со мной</h3>
                {[
                  { icon: 'User', label: 'Вышиденко Вероника Владимировна', sub: 'Учитель русского языка и литературы, зам. директора по УВР' },
                  { icon: 'Mail', label: 'veronika.vyshidenko@mail.ru', sub: 'Email' },
                  { icon: 'Phone', label: '+7 (495) 123-45-67', sub: 'Рабочий телефон' },
                  { icon: 'MapPin', label: 'МБОУ «Закладинская СОШ»', sub: 'Романовский район' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 border flex items-center justify-center flex-shrink-0" style={{ borderColor: 'rgba(196,164,74,0.3)' }}>
                      <Icon name={c.icon} fallback="Circle" size={16} style={{ color: '#c4a44a' }} />
                    </div>
                    <div>
                      <p className="text-sm" style={{ color: 'rgba(250,247,240,0.85)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{c.label}</p>
                      <p className="text-xs" style={{ color: 'rgba(250,247,240,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{c.sub}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t" style={{ borderColor: 'rgba(250,247,240,0.08)' }}>
                  <p className="text-xs mb-3 uppercase tracking-widest" style={{ color: 'rgba(250,247,240,0.35)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Часы приёма</p>
                  <p className="text-sm" style={{ color: 'rgba(250,247,240,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Пн, Ср, Пт — 15:00–16:30</p>
                  <p className="text-sm" style={{ color: 'rgba(250,247,240,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Кабинет № 215</p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl italic mb-6" style={{ color: '#faf7f0', fontFamily: 'Cormorant Garamond, serif' }}>Написать сообщение</h3>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  {[
                    { label: 'Ваше имя', type: 'text', placeholder: 'Иванов Иван' },
                    { label: 'Email', type: 'email', placeholder: 'email@example.com' },
                    { label: 'Тема', type: 'text', placeholder: 'Вопрос об уроке...' },
                  ].map((f, i) => (
                    <div key={i}>
                      <label className="text-xs uppercase tracking-widest block mb-1.5" style={{ color: 'rgba(250,247,240,0.45)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{f.label}</label>
                      <input
                        type={f.type}
                        className="w-full bg-transparent outline-none px-4 py-3 text-sm border transition-colors"
                        placeholder={f.placeholder}
                        style={{ borderColor: 'rgba(250,247,240,0.18)', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs uppercase tracking-widest block mb-1.5" style={{ color: 'rgba(250,247,240,0.45)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Сообщение</label>
                    <textarea
                      rows={5}
                      className="w-full bg-transparent outline-none px-4 py-3 text-sm border transition-colors resize-none"
                      placeholder="Ваш вопрос или сообщение..."
                      style={{ borderColor: 'rgba(250,247,240,0.18)', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-sm tracking-wide transition-all duration-300"
                    style={{ backgroundColor: '#8b6914', color: '#faf7f0', fontFamily: 'IBM Plex Sans, sans-serif' }}
                  >
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 text-center border-t" style={{ backgroundColor: '#2d1f0e', borderColor: 'rgba(250,247,240,0.05)' }}>
          <p className="italic text-sm" style={{ color: 'rgba(250,247,240,0.28)', fontFamily: 'Cormorant Garamond, serif' }}>
            © 2026 · Вышиденко Вероника Владимировна · Учитель русского языка и литературы · МБОУ «Закладинская СОШ»
          </p>
        </footer>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="w-12 h-12 border flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(139,105,20,0.08)', borderColor: 'rgba(139,105,20,0.2)' }}>
        <Icon name={icon} fallback="Circle" size={20} style={{ color: '#8b6914' }} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{subtitle}</p>
        <h2 className="text-4xl font-semibold" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{title}</h2>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon name={icon} fallback="Circle" size={14} style={{ color: '#8b6914' }} />
        <h4 className="text-xs uppercase tracking-widest" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{title}</h4>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{text}</p>
    </div>
  );
}

function TestModal({
  test, currentQ, selected, testDone, answers, score,
  onAnswer, onNext, onClose
}: {
  test: typeof TESTS[0];
  currentQ: number;
  selected: number | null;
  testDone: boolean;
  answers: (number | null)[];
  score: number;
  onAnswer: (i: number) => void;
  onNext: () => void;
  onClose: () => void;
}) {
  const q = test.questions[currentQ];
  const total = test.questions.length;

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <button onClick={onClose} className="flex items-center gap-2 text-sm mb-8 transition-colors" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>
        <Icon name="ArrowLeft" size={16} />
        Назад к тестам
      </button>
      <div className="border p-8" style={{ backgroundColor: '#faf7f0', borderColor: '#e8dcc8' }}>
        <h3 className="text-2xl font-semibold mb-1" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{test.title}</h3>
        <p className="text-xs mb-6" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{test.level}</p>

        {!testDone ? (
          <>
            <div className="flex gap-2 mb-6">
              {test.questions.map((_, i) => (
                <div
                  key={i}
                  className="h-1 flex-1 rounded-full transition-all"
                  style={{ backgroundColor: i < currentQ ? '#8b6914' : i === currentQ ? '#c4a44a' : '#e8dcc8' }}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'rgba(26,20,16,0.38)', fontFamily: 'IBM Plex Sans, sans-serif' }}>Вопрос {currentQ + 1} из {total}</p>
            <p className="text-xl font-semibold mb-6 leading-snug" style={{ color: '#1a1410', fontFamily: 'Cormorant Garamond, serif' }}>{q.q}</p>

            <div className="space-y-3 mb-8">
              {q.options.map((opt, i) => {
                let borderColor = '#e8dcc8';
                let bgColor = '#f5f0e8';
                let textColor = '#1a1410';
                if (selected !== null) {
                  if (i === q.answer) { borderColor = '#16a34a'; bgColor = '#f0fdf4'; }
                  else if (i === selected && i !== q.answer) { borderColor = '#f87171'; bgColor = '#fef2f2'; }
                  else { bgColor = 'rgba(245,240,232,0.5)'; textColor = 'rgba(26,20,16,0.4)'; }
                }
                return (
                  <button
                    key={i}
                    onClick={() => onAnswer(i)}
                    className="w-full text-left px-5 py-3.5 text-sm transition-all flex items-center gap-3 border"
                    style={{ borderColor, backgroundColor: bgColor, color: textColor, fontFamily: 'IBM Plex Sans, sans-serif', cursor: selected !== null ? 'default' : 'pointer' }}
                  >
                    <span className="w-6 h-6 border flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ borderColor: 'rgba(26,20,16,0.15)' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    {selected !== null && i === q.answer && <Icon name="Check" size={14} className="ml-auto" style={{ color: '#16a34a' }} />}
                    {selected !== null && i === selected && i !== q.answer && <Icon name="X" size={14} className="ml-auto" style={{ color: '#f87171' }} />}
                  </button>
                );
              })}
            </div>

            <button
              onClick={onNext}
              disabled={selected === null}
              className="px-8 py-3 text-sm transition-all"
              style={{
                backgroundColor: selected === null ? 'rgba(139,105,20,0.25)' : '#8b6914',
                color: '#faf7f0',
                cursor: selected === null ? 'not-allowed' : 'pointer',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              {currentQ + 1 < total ? 'Следующий вопрос' : 'Завершить тест'}
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl font-light mb-2" style={{ color: '#8b6914', fontFamily: 'Cormorant Garamond, serif' }}>{score}/{total}</div>
            <div className="text-sm mb-2" style={{ color: 'rgba(26,20,16,0.55)', fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {score === total ? 'Отлично! Все ответы верны.' : score >= total / 2 ? 'Хороший результат!' : 'Стоит повторить материал.'}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 border text-sm mt-8 transition-colors"
              style={{ borderColor: '#e8dcc8', color: '#1a1410', fontFamily: 'IBM Plex Sans, sans-serif' }}
            >
              К списку тестов
            </button>
          </div>
        )}
      </div>
    </div>
  );
}