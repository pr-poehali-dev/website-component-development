import Icon from '@/components/ui/icon';

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

export default function StudentsAchievementsGalleryContact({
  activeTest,
  currentQ,
  selected,
  answers,
  testDone,
  startTest,
  handleAnswer,
  nextQuestion,
  setActiveTest,
  getScore,
}: {
  activeTest: number | null;
  currentQ: number;
  selected: number | null;
  answers: (number | null)[];
  testDone: boolean;
  startTest: (id: number) => void;
  handleAnswer: (idx: number) => void;
  nextQuestion: () => void;
  setActiveTest: (id: number | null) => void;
  getScore: () => number;
}) {
  return (
    <>
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
    </>
  );
}
