import { useState } from 'react';
import SiteHeader from '@/components/sections/SiteHeader';
import HomeSections from '@/components/sections/HomeSections';
import AboutDocumentsMethods from '@/components/sections/AboutDocumentsMethods';
import StudentsAchievementsGalleryContact from '@/components/sections/StudentsAchievementsGalleryContact';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [testDone, setTestDone] = useState(false);

  const TESTS_DATA = [
    {
      id: 1,
      questions: [
        { answer: 0 },
        { answer: 1 },
        { answer: 2 },
      ],
    },
    {
      id: 2,
      questions: [
        { answer: 2 },
        { answer: 1 },
        { answer: 1 },
      ],
    },
    {
      id: 3,
      questions: [
        { answer: 3 },
        { answer: 2 },
        { answer: 1 },
      ],
    },
  ];

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
    const test = TESTS_DATA.find(t => t.id === activeTest)!;
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
    const test = TESTS_DATA.find(t => t.id === activeTest)!;
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

      <SiteHeader
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />

      <main className="pt-16 relative z-10">
        <HomeSections scrollTo={scrollTo} />
        <AboutDocumentsMethods />
        <StudentsAchievementsGalleryContact
          activeTest={activeTest}
          currentQ={currentQ}
          selected={selected}
          answers={answers}
          testDone={testDone}
          startTest={startTest}
          handleAnswer={handleAnswer}
          nextQuestion={nextQuestion}
          setActiveTest={setActiveTest}
          getScore={getScore}
        />
      </main>
    </div>
  );
}
