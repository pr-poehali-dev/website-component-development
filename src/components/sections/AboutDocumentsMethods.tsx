import Icon from '@/components/ui/icon';

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

function InfoBlock({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="p-5 border" style={{ backgroundColor: '#f5f0e8', borderColor: '#e8dcc8' }}>
      <div className="flex items-center gap-2 mb-2">
        <Icon name={icon} fallback="Circle" size={14} style={{ color: '#8b6914' }} />
        <h5 className="text-sm font-medium tracking-wide uppercase" style={{ color: '#8b6914', fontFamily: 'IBM Plex Sans, sans-serif' }}>{title}</h5>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,20,16,0.65)', fontFamily: 'IBM Plex Sans, sans-serif' }}>{text}</p>
    </div>
  );
}

export default function AboutDocumentsMethods() {
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
    </>
  );
}
