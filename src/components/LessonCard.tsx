import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Star } from 'lucide-react';
import { Lesson } from '../types';
import { cn } from '../lib/utils';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  isQuizSolved: boolean;
  onClick: () => void;
  theme: 'dark' | 'light';
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, isQuizSolved, onClick, theme }) => {
  const isDark = theme === 'dark';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-300 rounded-2xl",
        isDark 
          ? "bg-space-900/60 backdrop-blur-xl border border-white/10 text-slate-200 shadow-2xl hover:shadow-star-blue/10" 
          : "bg-white border border-slate-200 text-slate-800 shadow-lg hover:shadow-xl hover:border-slate-300"
      )}
      onClick={onClick}
      id={`lesson-${lesson.id}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
           <span className={cn(
             "px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border",
             isDark 
               ? "bg-void-black/80 backdrop-blur-md text-slate-200 border-white/10" 
               : "bg-slate-100/90 backdrop-blur-md text-slate-700 border-slate-200/50"
           )}>
            {lesson.category}
          </span>
        </div>
        {isCompleted && (
          <div className="absolute top-4 right-4 bg-green-500 text-white p-1.5 rounded-full shadow-lg">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className={cn(
          "text-xl font-display font-bold mb-2 group-hover:text-star-blue transition-colors",
          isDark ? "text-white" : "text-slate-900"
        )}>
          {lesson.title}
        </h3>
        <p className={cn(
          "text-sm line-clamp-2 mb-6 flex-grow",
          isDark ? "text-slate-400" : "text-slate-600"
        )}>
          {lesson.description}
        </p>

        <div className={cn(
          "flex items-center justify-between border-t pt-4",
          isDark ? "border-white/5" : "border-slate-100"
        )}>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">Mukofot</span>
            <div className="flex items-center gap-1 text-star-blue font-bold">
              <Star className="w-3 h-3 fill-current animate-pulse" />
              <span>{lesson.rewardPoints + lesson.quiz.rewardPoints} XP</span>
            </div>
          </div>
          
          <div className={cn(
            "px-4 py-2 text-xs rounded-lg font-display font-medium transition-all duration-300",
            isDark 
              ? "bg-space-800 border border-white/10 text-white hover:border-star-blue/50 hover:bg-space-900 hover:shadow-[0_0_15px_rgba(79,204,255,0.15)]" 
              : "bg-slate-100 border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-200"
          )}>
            {isCompleted ? 'Takrorlash' : 'Boshlash'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
