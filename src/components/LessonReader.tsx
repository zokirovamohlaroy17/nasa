import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';
import { cn } from '../lib/utils';

interface LessonReaderProps {
  lesson: Lesson;
  onBack: () => void;
  onStartQuiz: () => void;
  isCompleted: boolean;
  theme: 'dark' | 'light';
}

export const LessonReader: React.FC<LessonReaderProps> = ({ lesson, onBack, onStartQuiz, isCompleted, theme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
      id="lesson-reader"
    >
      <button 
        onClick={onBack}
        className={cn(
          "flex items-center gap-2 mb-8 transition-colors group font-mono text-sm uppercase tracking-widest",
          isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
        )}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Orqaga</span>
      </button>

      <div className="relative h-80 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-2 text-white">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-star-blue font-mono text-xs tracking-widest uppercase">
            <span>{lesson.category}</span>
            <span>•</span>
            <span>{lesson.rewardPoints} XP o'qish uchun</span>
          </div>
        </div>
      </div>

      <div className={cn(
        "p-8 md:p-12 mb-12 rounded-2xl border transition-all duration-300",
        isDark 
          ? "bg-space-900/60 backdrop-blur-xl border-white/10 shadow-2xl text-slate-200" 
          : "bg-white border-slate-200 shadow-xl text-slate-800"
      )}>
        <div className={cn(
          "markdown-body prose max-w-none transition-colors",
          isDark ? "prose-invert text-slate-300" : "prose-slate text-slate-700"
        )}>
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </div>
      </div>

      <div className="flex justify-center mb-24">
        <button 
          onClick={onStartQuiz}
          className={cn(
            "flex items-center gap-3 px-12 py-4 text-lg font-display font-medium rounded-xl transition-all duration-300 border shadow-lg group",
            isDark 
              ? "bg-star-blue/15 border-star-blue/40 text-star-blue hover:bg-star-blue/25 hover:shadow-[0_0_25px_rgba(79,204,255,0.25)]" 
              : "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.25)]"
          )}
          id="start-quiz-btn"
        >
          <BrainCircuit className="w-6 h-6 animate-pulse group-hover:rotate-12 transition-transform" />
          <span>Quizni Boshlash (+{lesson.quiz.rewardPoints} XP)</span>
        </button>
      </div>
    </motion.div>
  );
};
