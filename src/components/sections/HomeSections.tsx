import Icon from '@/components/ui/icon';
import { NAV_ITEMS } from './SiteHeader';

const NEWS = [
  { date: '20 февраля 2026', title: 'Олимпиада по русскому языку', text: 'Поздравляем победителей городской олимпиады! Трое учеников вышли в региональный тур.' },
  { date: '10 февраля 2026', title: 'Литературный вечер', text: 'Прошёл вечер памяти А.С. Пушкина. Ученики 8–11 классов читали стихи и прозу.' },
  { date: '1 февраля 2026', title: 'Открытый урок', text: 'Приглашаем коллег на открытый урок по теме «Сложные синтаксические конструкции» — 5 марта.' },
];

export default function HomeSections({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
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
  );
}
