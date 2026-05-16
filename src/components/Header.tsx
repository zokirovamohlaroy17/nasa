import React from 'react';
import { Rocket, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  points: number;
  onHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ points, onHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void-black/80 backdrop-blur-md border-bottom border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
          id="nav-logo"
        >
          <div className="bg-star-blue/20 p-2 rounded-lg group-hover:bg-star-blue/30 transition-colors">
            <Rocket className="w-6 h-6 text-star-blue" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            NASA ACADEMY
          </span>
        </div>

        <div className="flex items-center gap-6">
          <motion.div 
            key={points}
            initial={{ scale: 1.2, color: '#4fccff' }}
            animate={{ scale: 1, color: '#f8fafc' }}
            className="flex items-center gap-2 bg-space-800 px-4 py-1.5 rounded-full border border-white/5 shadow-inner"
            id="points-display"
          >
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-mono font-bold text-sm tracking-widest">
              {points.toLocaleString()} XP
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
