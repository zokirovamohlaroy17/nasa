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
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, isCompleted, isQuizSolved, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel group overflow-hidden flex flex-col h-full cursor-pointer transition-shadow hover:shadow-star-blue/10"
      onClick={onClick}
      id={`lesson-${lesson.id}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={lesson.imageUrl} 
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900 to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
           <span className="px-3 py-1 rounded-full bg-void-black/80 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase border border-white/10">
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
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-star-blue transition-colors">
          {lesson.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-grow">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Mukofot</span>
            <div className="flex items-center gap-1 text-star-blue font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{lesson.rewardPoints + lesson.quiz.rewardPoints} XP</span>
            </div>
          </div>
          
          <div className="cyber-button px-4 py-2 text-xs">
            {isCompleted ? 'Takrorlash' : 'Boshlash'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
