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

export { NAV_ITEMS };

export default function SiteHeader({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollTo,
}: {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}) {
  return (
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
  );
}
