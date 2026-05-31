import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonCard } from './components/LessonCard';
import { LessonReader } from './components/LessonReader';
import { QuizModule } from './components/QuizModule';
import { NasaNews } from './components/NasaNews';
import { LESSONS } from './data/lessons';
import { UserProgress, Lesson } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, BookOpen, Star, Compass } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('nasa_academy_progress');
    return saved ? JSON.parse(saved) : { points: 0, completedLessons: [], solvedQuizzes: [] };
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('nasa_academy_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  const [activeView, setActiveView] = useState<'home' | 'lesson' | 'quiz'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    localStorage.setItem('nasa_academy_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('nasa_academy_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAddPoints = (amount: number, reason: string) => {
    setProgress(prev => {
      const nextPoints = prev.points + amount;
      return {
        ...prev,
        points: nextPoints
      };
    });
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setActiveView('lesson');
    
    // Grant points for reading if not already completed
    if (!progress.completedLessons.includes(lesson.id)) {
      setProgress(prev => ({
        ...prev,
        points: prev.points + lesson.rewardPoints,
        completedLessons: [...prev.completedLessons, lesson.id]
      }));
    }
  };

  const handleQuizStart = () => {
    setActiveView('quiz');
  };

  const handleQuizComplete = (success: boolean) => {
    if (success && selectedLesson && !progress.solvedQuizzes.includes(selectedLesson.id)) {
      setProgress(prev => ({
        ...prev,
        points: prev.points + selectedLesson.quiz.rewardPoints,
        solvedQuizzes: [...prev.solvedQuizzes, selectedLesson.id]
      }));
    }
    setActiveView('home');
    setSelectedLesson(null);
  };

  const handleHomeNav = () => {
    setActiveView('home');
    setSelectedLesson(null);
  };

  const isDark = theme === 'dark';

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-12 px-4 transition-colors duration-300 relative overflow-hidden",
      isDark ? "bg-void-black text-slate-200" : "bg-slate-50 text-slate-800"
    )}>
      {/* Background celestial glows */}
      {isDark ? (
        <div className="nebula-glow" />
      ) : (
        <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-tr from-indigo-50/20 via-sky-50/20 to-transparent" />
      )}

      <Header 
        points={progress.points} 
        onHome={handleHomeNav} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-16"
              id="home-view"
            >
              {/* Hero Banner Section */}
              <div className="text-center max-w-3xl mx-auto pt-6">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase mb-6",
                    isDark ? "bg-star-blue/10 border border-star-blue/20 text-star-blue" : "bg-indigo-50 border border-indigo-100 text-indigo-700"
                  )}
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  Koinotni o'rganish vaqti keldi
                </motion.div>
                
                <h1 className={cn(
                  "text-5xl md:text-7xl font-display font-extrabold mb-6 tracking-tight transition-all",
                  isDark 
                    ? "bg-gradient-to-b from-white via-slate-100 to-slate-500 bg-clip-text text-transparent" 
                    : "text-slate-900"
                )}>
                  NASA Akademiyasi
                </h1>
                
                <p className={cn(
                  "text-lg md:text-xl font-sans leading-relaxed transition-colors",
                  isDark ? "text-slate-400" : "text-slate-600"
                )}>
                  Koinot sirlarini biz bilan o'rganing. Darslarni tamomlang, interaktiv quizlarni yeching va haqiqiy koinot tadqiqotchisiga aylanib ball (XP) yig'ing.
                </p>
                
                {/* Visual Stats Indicators */}
                <div className="grid grid-cols-3 max-w-md mx-auto items-center justify-center gap-6 mt-12 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/5 shadow-inner">
                  <div className="flex flex-col items-center">
                    <span className={cn("text-3xl font-display font-bold", isDark ? "text-white" : "text-slate-900")}>
                      {progress.completedLessons.length}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium">Bajarilgan darslar</span>
                  </div>
                  <div className="w-px h-10 bg-white/10 self-center" />
                  <div className="flex flex-col items-center">
                    <span className={cn("text-3xl font-display font-bold", isDark ? "text-white" : "text-slate-900")}>
                      {progress.solvedQuizzes.length}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium">Yechilgan quzlar</span>
                  </div>
                  <div className="w-px h-10 bg-white/10 self-center" />
                   <div className="flex flex-col items-center">
                    <span className="text-3xl font-display font-bold text-star-blue">
                      {progress.points}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-medium">Jami ball (XP)</span>
                  </div>
                </div>
              </div>

              {/* LIVE SPACE NEWS AND APOD REGION (NASA Original API integration) */}
              <section className="pt-4">
                <NasaNews theme={theme} onAddPoints={handleAddPoints} />
              </section>

              {/* CURRICULUM ACADEMY SECTION */}
              <section className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <h2 className={cn(
                    "text-3xl font-display font-bold flex items-center gap-2",
                    isDark ? "text-white" : "text-slate-900"
                  )}>
                    <Compass className="w-8 h-8 text-star-blue animate-pulse" />
                    Akademiya Darsliklari
                  </h2>
                  <p className={isDark ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}>
                    Koinot ilmini chuqur o'rganing, darslarni o'zlashtiring va har bir dars so'ngidagi quizda kuchingizni sinab ko'ring
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {LESSONS.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={progress.completedLessons.includes(lesson.id)}
                      isQuizSolved={progress.solvedQuizzes.includes(lesson.id)}
                      onClick={() => handleLessonSelect(lesson)}
                      theme={theme}
                    />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeView === 'lesson' && selectedLesson && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LessonReader 
                lesson={selectedLesson} 
                onBack={handleHomeNav} 
                onStartQuiz={handleQuizStart}
                isCompleted={progress.completedLessons.includes(selectedLesson.id)}
                theme={theme}
              />
            </motion.div>
          )}

          {activeView === 'quiz' && selectedLesson && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuizModule 
                quiz={selectedLesson.quiz} 
                onBack={() => setActiveView('lesson')} 
                onComplete={handleQuizComplete} 
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className={cn(
        "mt-24 py-12 border-t text-center transition-colors duration-300",
        isDark ? "border-white/5" : "border-slate-250"
      )}>
        <p className={cn(
          "text-xs font-mono tracking-widest uppercase",
          isDark ? "text-slate-600" : "text-slate-500"
        )}>
          &copy; {new Date().getFullYear()} NASA Akademiyasi • Bilim va kashfiyot chegarasizdir
        </p>
        <p className={cn(
          "text-[10px] font-mono mt-1",
          isDark ? "text-slate-700" : "text-slate-400"
        )}>
          NASA live API hamda Gemini sinxronizatsiyasi o'rnatilgan
        </p>
      </footer>
    </div>
  );
}
