import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCcw, Trophy, XCircle } from 'lucide-react';
import { Quiz, Question } from '../types';
import { cn } from '../lib/utils';

interface QuizModuleProps {
  quiz: Quiz;
  onComplete: (success: boolean) => void;
  onBack: () => void;
  theme: 'dark' | 'light';
}

export const QuizModule: React.FC<QuizModuleProps> = ({ quiz, onComplete, onBack, theme }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const isDark = theme === 'dark';
  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    if (isCorrect) setScore(val => val + 1);
    setIsAnswered(true);

    setTimeout(() => {
      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(val => val + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  if (isFinished) {
    const success = score === quiz.questions.length;
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "max-w-xl mx-auto p-12 text-center rounded-2xl border transition-all duration-300",
          isDark 
            ? "bg-space-900/60 backdrop-blur-xl border-white/10 shadow-2xl text-slate-200" 
            : "bg-white border-slate-200 shadow-xl text-slate-800"
        )}
        id="quiz-results"
      >
        <div className="flex justify-center mb-6">
          {success ? (
            <div className="bg-green-500/20 p-6 rounded-full relative">
              <Trophy className="w-16 h-16 text-green-500" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-green-500/10 blur-xl rounded-full" 
              />
            </div>
          ) : (
            <div className="bg-red-500/20 p-6 rounded-full">
              <RefreshCcw className="w-16 h-16 text-red-500" />
            </div>
          )}
        </div>

        <h2 className={cn(
          "text-3xl font-display font-bold mb-2",
          isDark ? "text-white" : "text-slate-900"
        )}>
          {success ? 'Tabriklaymiz!' : 'Yana bir bor urinib ko\'ring'}
        </h2>
        <p className={isDark ? "text-slate-400 mb-8" : "text-slate-600 mb-8"}>
          Siz {quiz.questions.length} tadan {score} ta to'g'ri javob berdingiz.
        </p>

        <div className="flex flex-col gap-3">
          {success ? (
            <button 
              onClick={() => onComplete(true)}
              className={cn(
                "px-6 py-4 rounded-xl font-display font-bold text-lg border transition-all duration-300",
                isDark 
                  ? "bg-star-blue/20 border-star-blue/40 text-star-blue hover:bg-star-blue/30 hover:shadow-[0_0_20px_rgba(79,204,255,0.2)]" 
                  : "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 hover:shadow-[0_0_20px_rgba(79,70,229,0.2)]"
              )}
              id="quiz-finish-success"
            >
              Mukofotni Olish (+{quiz.rewardPoints} XP)
            </button>
          ) : (
            <>
              <button 
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setScore(0);
                  setIsFinished(false);
                  setSelectedOption(null);
                  setIsAnswered(false);
                }}
                className={cn(
                  "px-6 py-4 rounded-xl font-display font-bold text-lg border transition-all duration-300",
                  isDark 
                    ? "bg-space-800 border-white/10 text-white hover:bg-space-900 hover:border-white/30" 
                    : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200 hover:border-slate-300"
                )}
                id="quiz-retry"
              >
                Qaytadan urinish
              </button>
              <button 
                onClick={onBack}
                className={cn(
                  "transition-colors py-2 font-mono text-xs uppercase tracking-widest",
                  isDark ? "text-slate-500 hover:text-white" : "text-slate-500 hover:text-slate-900"
                )}
              >
                Darsga qaytish
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" id="quiz-module">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className={cn(
            "text-[10px] font-mono uppercase tracking-[0.2em]",
            isDark ? "text-slate-500" : "text-slate-400"
          )}>Savol {currentQuestionIndex + 1} / {quiz.questions.length}</span>
          <h2 className={cn(
            "text-xl font-display font-bold",
            isDark ? "text-white" : "text-slate-900"
          )}>Bilimingizni sinang</h2>
        </div>
        <div className={cn(
          "h-1 flex-grow mx-8 rounded-full overflow-hidden",
          isDark ? "bg-white/5" : "bg-slate-200"
        )}>
          <motion.div 
            className="h-full bg-star-blue"
            animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className={cn(
        "p-8 md:p-10 rounded-2xl border transition-all duration-300",
        isDark 
          ? "bg-space-900/60 backdrop-blur-xl border-white/10 shadow-2xl text-slate-200" 
          : "bg-white border-slate-200 shadow-xl text-slate-800"
      )}>
        <h3 className={cn(
          "text-2xl font-medium mb-8 leading-snug",
          isDark ? "text-white" : "text-slate-900"
        )}>
          {currentQuestion.text}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const isCorrect = isAnswered && index === currentQuestion.correctAnswerIndex;
            const isWrong = isAnswered && isSelected && index !== currentQuestion.correctAnswerIndex;

            return (
              <button
                key={index}
                disabled={isAnswered}
                onClick={() => handleOptionSelect(index)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                  isSelected 
                    ? (isDark ? "bg-star-blue/10 border-star-blue" : "bg-indigo-50 border-indigo-500 text-indigo-900") 
                    : (isDark ? "bg-white/5 border-white/5 hover:border-white/20" : "bg-slate-50 border-slate-100 hover:border-slate-300 hover:bg-slate-100 text-slate-700"),
                  isCorrect && (isDark ? "bg-green-500/20 border-green-500 text-green-400" : "bg-green-50 border-green-500 text-green-700"),
                  isWrong && (isDark ? "bg-red-500/20 border-red-500 text-red-500" : "bg-red-50 border-red-500 text-red-700")
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs border",
                    isSelected 
                      ? "bg-star-blue text-void-black border-star-blue font-bold" 
                      : (isDark ? "bg-white/5 border-white/10 group-hover:border-white/30" : "bg-slate-200 border-slate-300 group-hover:border-slate-400 text-slate-600")
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg font-medium">{option}</span>
                </div>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleConfirm}
            disabled={selectedOption === null || isAnswered}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-lg font-display font-medium transition-all duration-300 border disabled:opacity-35 disabled:cursor-not-allowed",
              isDark 
                ? "bg-space-800 border-white/10 hover:border-star-blue/50 hover:bg-space-900 hover:shadow-[0_0_15px_rgba(79,204,255,0.15)] text-white" 
                : "bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 hover:shadow-[0_0_15px_rgba(79,70,229,0.15)]"
            )}
          >
            <span>Keyingisi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
