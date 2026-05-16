import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, CheckCircle2, ChevronRight, RefreshCcw, Trophy, XCircle } from 'lucide-react';
import { Quiz, Question } from '../types';
import { cn } from '../lib/utils';

interface QuizModuleProps {
  quiz: Quiz;
  onComplete: (success: boolean) => void;
  onBack: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ quiz, onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

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
        className="max-w-xl mx-auto glass-panel p-12 text-center"
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

        <h2 className="text-3xl font-display font-bold mb-2">
          {success ? 'Tabriklaymiz!' : 'Yana bir bor urinib ko\'ring'}
        </h2>
        <p className="text-slate-400 mb-8">
          Siz {quiz.questions.length} tadan {score} ta to'g'ri javob berdingiz.
        </p>

        <div className="flex flex-col gap-3">
          {success ? (
            <button 
              onClick={() => onComplete(true)}
              className="cyber-button bg-star-blue/20 border-star-blue/40 text-lg py-4"
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
                className="cyber-button bg-slate-800 py-4"
                id="quiz-retry"
              >
                Qaytadan urinish
              </button>
              <button 
                onClick={onBack}
                className="text-slate-500 hover:text-white transition-colors py-2 font-mono text-xs uppercase tracking-widest"
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
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em]">Savol {currentQuestionIndex + 1} / {quiz.questions.length}</span>
          <h2 className="text-xl font-display font-bold">Bilimingizni sinang</h2>
        </div>
        <div className="h-1 flex-grow mx-8 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-star-blue"
            animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="glass-panel p-8 md:p-10">
        <h3 className="text-2xl font-medium mb-8 leading-snug">
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
                  isSelected ? "bg-star-blue/10 border-star-blue" : "bg-white/5 border-white/5 hover:border-white/20",
                  isCorrect && "bg-green-500/20 border-green-500 text-green-400",
                  isWrong && "bg-red-500/20 border-red-500 text-red-500"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs border",
                    isSelected ? "bg-star-blue text-void-black border-star-blue" : "bg-white/5 border-white/10 group-hover:border-white/30"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg">{option}</span>
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
            className="cyber-button flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Keyingisi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
