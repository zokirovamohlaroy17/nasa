import React from 'react';
import { Rocket, Trophy, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  points: number;
  onHome: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ points, onHome, theme, onToggleTheme }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${
      theme === 'dark' 
        ? 'bg-void-black/80 border-b border-white/10 text-white' 
        : 'bg-white/80 border-b border-slate-200 text-slate-800'
    } backdrop-blur-md transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
          id="nav-logo"
        >
          <div className="bg-star-blue/20 p-2 rounded-lg group-hover:bg-star-blue/30 transition-colors">
            <Rocket className="w-6 h-6 text-star-blue" />
          </div>
          <span className={`font-display font-bold text-xl tracking-tight transition-colors ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent' 
              : 'text-slate-900'
          }`}>
            NASA ACADEMY
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              theme === 'dark' 
                ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-yellow-400 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                : 'bg-slate-100 border border-slate-200 hover:bg-slate-200 text-indigo-600 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]'
            }`}
            title={theme === 'dark' ? "Kunduzgi rejim" : "Tungi rejim"}
            id="theme-toggler"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <motion.div 
            key={points}
            initial={{ scale: 1.2, color: '#4fccff' }}
            animate={{ scale: 1, color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-inner ${
              theme === 'dark' 
                ? 'bg-space-800 border-white/5' 
                : 'bg-slate-100 border-slate-200'
            }`}
            id="points-display"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono font-bold text-sm tracking-widest text-star-blue">
              {points.toLocaleString()} XP
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
