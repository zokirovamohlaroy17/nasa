import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LessonCard } from './components/LessonCard';
import { LessonReader } from './components/LessonReader';
import { QuizModule } from './components/QuizModule';
import { LESSONS } from './data/lessons';
import { UserProgress, Lesson } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Trophy, BookOpen, Star } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('nasa_academy_progress');
    return saved ? JSON.parse(saved) : { points: 0, completedLessons: [], solvedQuizzes: [] };
  });

  const [activeView, setActiveView] = useState<'home' | 'lesson' | 'quiz'>('home');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    localStorage.setItem('nasa_academy_progress', JSON.stringify(progress));
  }, [progress]);

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

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="nebula-glow" />
      <Header points={progress.points} onHome={handleHomeNav} />

      <main className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              id="home-view"
            >
              <div className="mb-16 text-center max-w-3xl mx-auto">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-star-blue/10 border border-star-blue/20 text-star-blue text-xs font-mono tracking-widest uppercase mb-6"
                >
                  <Sparkles className="w-3 h-3" />
                  Koinotni o'rganish vaqti
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                  Nasa akademiyasiga xush kelibsiz
                </h1>
                <p className="text-xl text-slate-400 font-sans leading-relaxed">
                  Koinot sirlarini biz bilan o'rganing. Darslarni o'qing, quizlarni yeching va haqiqiy koinot tadqiqotchisiga aylaning.
                </p>
                
                <div className="flex items-center justify-center gap-8 mt-12">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-display font-bold text-white">{progress.completedLessons.length}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Darslar</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-display font-bold text-white">{progress.solvedQuizzes.length}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Quizlar</span>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                   <div className="flex flex-col items-center">
                    <span className="text-3xl font-display font-bold text-star-blue">{progress.points}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Jami XP</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LESSONS.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    lesson={lesson}
                    isCompleted={progress.completedLessons.includes(lesson.id)}
                    isQuizSolved={progress.solvedQuizzes.includes(lesson.id)}
                    onClick={() => handleLessonSelect(lesson)}
                  />
                ))}
              </div>
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
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-24 py-12 border-t border-white/5 text-center">
        <p className="text-slate-600 text-sm font-mono tracking-widest uppercase">
          &copy; 2024 Nasa Akademiyasi • Bilim chegarasizdir
        </p>
      </footer>
    </div>
  );
}

