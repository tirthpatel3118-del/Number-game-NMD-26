import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { playClick } from '../utils/audio';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = (path: string) => {
    playClick();
    navigate(path);
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center py-6 font-sans select-none max-w-5xl mx-auto px-4">
      {/* Title & Subtitle */}
      <div className="text-center space-y-6 max-w-3xl mb-12 md:mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
          Number Intelligence <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-amber-500 via-indigo-650 to-teal-500 bg-clip-text text-transparent">
            Challenge
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Choose a game and discover the mathematics behind intelligent guessing.
        </p>
      </div>

      {/* Two giant interactive game cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        
        {/* Game Card 1: Mathematical Mind Reader */}
        <Card 
          mathTheme 
          className="p-8 md:p-10 flex flex-col justify-between items-center text-center space-y-6 border-2 border-indigo-100 hover:border-indigo-500 dark:border-slate-800 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 rounded-3xl"
        >
          <div className="space-y-4">
            <span className="text-6xl md:text-7xl block animate-bounce" role="img" aria-label="brain">🧠</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Mathematical Mind Reader
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Think of a number from 1 to 100 and the computer will predict it in 7 questions or less.
            </p>
          </div>
          
          <Button 
            variant="math" 
            size="lg" 
            fullWidth 
            onClick={() => handleStart('/mind-reader')}
            className="py-4.5 text-lg sm:text-xl font-extrabold rounded-2xl tracking-wide shadow-md shadow-indigo-500/10"
          >
            Start Mind Reader
          </Button>
        </Card>

        {/* Game Card 2: Probability Challenge */}
        <Card 
          mathTheme 
          className="p-8 md:p-10 flex flex-col justify-between items-center text-center space-y-6 border-2 border-teal-100 hover:border-teal-500 dark:border-slate-800 dark:hover:border-teal-500 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-500/10 hover:-translate-y-2 rounded-3xl"
        >
          <div className="space-y-4">
            <span className="text-6xl md:text-7xl block animate-bounce" role="img" aria-label="target">🎯</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
              Probability Challenge
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              The computer chooses a number. Can you guess it within 7 attempts?
            </p>
          </div>

          <Button 
            variant="math" 
            size="lg" 
            fullWidth 
            onClick={() => handleStart('/probability')}
            className="py-4.5 text-lg sm:text-xl font-extrabold rounded-2xl tracking-wide shadow-md shadow-emerald-500/10 bg-emerald-650 hover:bg-emerald-700 text-white"
          >
            Start Challenge
          </Button>
        </Card>

      </div>
    </div>
  );
};
