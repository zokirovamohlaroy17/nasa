import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, BrainCircuit, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';

interface LessonReaderProps {
  lesson: Lesson;
  onBack: () => void;
  onStartQuiz: () => void;
  isCompleted: boolean;
}

export const LessonReader: React.FC<LessonReaderProps> = ({ lesson, onBack, onStartQuiz, isCompleted }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
      id="lesson-reader"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-sm uppercase tracking-widest">Orqaga</span>
      </button>

      <div className="relative h-80 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void-black via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-2">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-4 text-star-blue font-mono text-xs tracking-widest uppercase">
            <span>{lesson.category}</span>
            <span>•</span>
            <span>{lesson.rewardPoints} XP o'qish uchun</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 md:p-12 mb-12">
        <div className="markdown-body prose prose-invert max-w-none">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </div>
      </div>

      <div className="flex justify-center mb-24">
        <button 
          onClick={onStartQuiz}
          className="cyber-button flex items-center gap-3 px-12 py-4 text-lg group bg-star-blue/10 border-star-blue/30"
          id="start-quiz-btn"
        >
          <BrainCircuit className="w-6 h-6 text-star-blue group-hover:rotate-12 transition-transform" />
          <span>Quizni Boshlash (+{lesson.quiz.rewardPoints} XP)</span>
        </button>
      </div>
    </motion.div>
  );
};
