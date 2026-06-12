import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useGame } from '../context/GameContext';
import { Confetti } from '../components/Confetti';
import { playClick, playTick, playChime } from '../utils/audio';

type GameState = 'start' | 'playing' | 'ended';

export const MindReader: React.FC = () => {
  const navigate = useNavigate();
  const { addLeaderboardEntry, incrementGamesPlayed, incrementGamesWon } = useGame();

  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState<GameState>('start');
  const [countdown, setCountdown] = useState(15);

  // Binary search bounds
  const [lower, setLower] = useState<number>(1);
  const [upper, setUpper] = useState<number>(100);
  const [questionCount, setQuestionCount] = useState<number>(1);
  const [history, setHistory] = useState<{ step: number; bounds: [number, number]; mid: number; answer: 'Yes' | 'No' }[]>([]);

  const mid = Math.floor((lower + upper) / 2);

  const startChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setLower(1);
    setUpper(100);
    setQuestionCount(1);
    setHistory([]);
    setGameState('playing');
    incrementGamesPlayed('mind_reader');
  };

  const handleResponse = (greaterThanMid: boolean) => {
    playClick();
    const nextHistoryItem = {
      step: questionCount,
      bounds: [lower, upper] as [number, number],
      mid,
      answer: greaterThanMid ? 'Yes' as const : 'No' as const
    };

    let nextLower = lower;
    let nextUpper = upper;

    if (greaterThanMid) {
      nextLower = mid + 1;
    } else {
      nextUpper = mid;
    }

    setHistory((prev) => [...prev, nextHistoryItem]);

    if (nextLower === nextUpper) {
      // Game ended, number identified
      playChime();
      setLower(nextLower);
      setUpper(nextUpper);
      
      const steps = questionCount;
      const score = Math.max(100, 1000 - (steps - 1) * 100);
      incrementGamesWon('mind_reader', score);
      
      // Auto-save run to leaderboard backend
      addLeaderboardEntry({
        username: username.trim() || 'Visitor',
        game: 'mind_reader',
        score,
        duration: steps * 3,
        difficulty: 'medium'
      });
      
      setGameState('ended');
    } else {
      playTick();
      setLower(nextLower);
      setUpper(nextUpper);
      setQuestionCount((prev) => prev + 1);
    }
  };

  const returnToHome = () => {
    playClick();
    navigate('/');
  };

  useEffect(() => {
    if (gameState !== 'ended') return;

    setCountdown(15);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, navigate]);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-10 font-sans select-none">
      {gameState === 'ended' && <Confetti />}

      {/* START INSTRUCTION SCREEN */}
      {gameState === 'start' && (
        <Card mathTheme className="p-8 md:p-12 border-2 border-indigo-100 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-5xl block animate-bounce" role="img" aria-label="brain">🧠</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How To Play
            </h1>
          </div>

          {/* Simple step-by-step instructions */}
          <div className="space-y-4 max-w-md mx-auto">
            {[
              "Think of a number from 1 to 100.",
              "Do not tell anyone.",
              "Answer Yes or No.",
              "The computer will predict your number."
            ].map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                <span className="w-10 h-10 rounded-full bg-indigo-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0">
                  {idx + 1}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={startChallenge} className="space-y-6 max-w-md mx-auto">
            {/* Minimal Touch-friendly competitor input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">
                Competitor Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter player name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:border-indigo-500 text-center font-bold text-lg transition-all shadow-inner"
              />
            </div>

            <Button variant="math" fullWidth type="submit" className="py-5 text-xl font-black rounded-2xl shadow-lg shadow-indigo-500/10">
              Start Game
            </Button>
          </form>
        </Card>
      )}

      {/* PLAYING QUESTION LOOP SCREEN */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="md:col-span-2">
            <Card mathTheme className="p-8 md:p-10 text-center space-y-8 h-full flex flex-col justify-between border-2 border-indigo-100 dark:border-slate-800">
              
              <div className="flex justify-between items-center">
                <Badge variant="primary" size="md" className="py-1.5 px-3.5 text-xs sm:text-sm font-extrabold font-mono">
                  Question {questionCount} of 7
                </Badge>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Bounds: [{lower}, {upper}]
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="space-y-2">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden relative">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-amber-400 to-indigo-500 transition-all duration-300"
                    style={{
                      left: `${lower - 1}%`,
                      width: `${upper - lower + 1}%`
                    }}
                  />
                </div>
              </div>

              {/* Central Question Display */}
              <div className="space-y-4 py-6">
                <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest block font-bold">Is your secret number</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-none">
                  Greater than <span className="text-indigo-600 dark:text-indigo-400 font-mono text-5xl sm:text-6xl md:text-7xl block sm:inline mt-2 sm:mt-0">{mid}</span>?
                </h2>
              </div>

              {/* Large touch-friendly response triggers */}
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto w-full pt-4">
                <button 
                  onClick={() => handleResponse(true)}
                  className="py-6 px-4 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-2xl tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Yes
                </button>
                <button 
                  onClick={() => handleResponse(false)}
                  className="py-6 px-4 rounded-3xl bg-slate-200 dark:bg-slate-900 hover:bg-slate-350 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-black text-2xl tracking-wide border border-slate-300 dark:border-slate-800 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  No
                </button>
              </div>

            </Card>
          </div>

          {/* Quick sidebar visual tree */}
          <div className="md:col-span-1">
            <Card className="h-full p-6 flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Halving Space Log
                </h3>
                <p className="text-xs text-slate-400">Binary Tree Branches</p>
              </div>

              <div className="flex-grow py-4 overflow-y-auto max-h-[300px] md:max-h-none space-y-2.5 font-mono text-[10px] sm:text-xs">
                {history.length > 0 ? (
                  history.map((log) => (
                    <div 
                      key={log.step} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                      <div>
                        <span className="font-extrabold text-indigo-500">#{log.step}</span>
                        <div className="text-slate-400 font-bold">[{log.bounds[0]}-{log.bounds[1]}]</div>
                      </div>
                      <div className="text-right">
                        <span className="block text-slate-500 font-bold">&gt; {log.mid}?</span>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${log.answer === 'Yes' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {log.answer}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 font-sans">
                    Waiting for first binary branch split...
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* END RESULTS SCREEN */}
      {gameState === 'ended' && (
        <Card mathTheme className="max-w-2xl mx-auto p-8 md:p-12 border-2 border-indigo-100 dark:border-slate-800 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Results Screen</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How Did The Computer Know?
            </h1>
          </div>

          {/* Simple Explanation text exactly from user description */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 text-base sm:text-lg text-slate-655 dark:text-slate-300 leading-relaxed font-semibold space-y-3">
            <p>
              The computer used a <strong>Binary Search Algorithm</strong>.
            </p>
            <p>
              Each question removes half of the remaining possibilities.
            </p>
            <p>
              1–100 contains 100 numbers.
            </p>
            <p>
              By repeatedly dividing possibilities into halves, the computer can find any number in at most 7 questions.
            </p>
          </div>

          {/* Results stats */}
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-center">
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-900 border-2 border-indigo-100/50 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-bold uppercase tracking-wide mb-1">Final Number</span>
              <span className="text-4xl font-extrabold font-mono text-indigo-650 dark:text-indigo-400">{lower}</span>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border-2 border-amber-100/50 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-bold uppercase tracking-wide mb-1">Total Questions Used</span>
              <span className="text-4xl font-extrabold font-mono text-amber-500">{questionCount}</span>
            </div>
          </div>

          {/* Simple Binary Search Visualization */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block text-center">
              Binary Search Path Visualization
            </span>
            <div className="flex flex-wrap justify-center items-center gap-2 max-w-lg mx-auto">
              {history.map((log, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center p-2 rounded-xl bg-slate-900 text-white font-mono text-xs border border-slate-800">
                    <span className="text-[9px] text-slate-500 font-bold">Step {idx + 1}</span>
                    <span className="text-emerald-400 font-bold">Mid: {log.mid}</span>
                    <span className="text-[10px] text-slate-400">[{log.bounds[0]}-{log.bounds[1]}]</span>
                  </div>
                  {idx < history.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Kiosk Mode Auto-redirect indicator */}
          <div className="text-center text-xs sm:text-sm font-extrabold text-indigo-500/80 animate-pulse">
            Returning to Home Screen in {countdown} seconds...
          </div>

          <div className="pt-4 max-w-sm mx-auto">
            <Button
              variant="math"
              fullWidth
              onClick={returnToHome}
              className="py-5 text-xl font-black rounded-2xl shadow-lg shadow-indigo-500/10 cursor-pointer"
            >
              Return Now
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
