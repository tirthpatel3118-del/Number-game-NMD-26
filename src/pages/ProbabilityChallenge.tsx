import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, AlertCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useGame } from '../context/GameContext';
import { Confetti } from '../components/Confetti';
import { playClick, playChime, playError } from '../utils/audio';
import { Modal } from '../components/Modal';

type GameState = 'start' | 'playing' | 'won' | 'lost';

export const ProbabilityChallenge: React.FC = () => {
  const navigate = useNavigate();
  const { leaderboard, addLeaderboardEntry, incrementGamesPlayed, incrementGamesWon } = useGame();

  // Username
  const [username, setUsername] = useState('');
  const [gameState, setGameState] = useState<GameState>('start');

  // Secret game states
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [attemptsUsed, setAttemptsUsed] = useState<number>(0);
  const [maxAttempts] = useState<number>(7);
  const [feedback, setFeedback] = useState<string>('');
  const [guessHistory, setGuessHistory] = useState<{ attempt: number; guess: number; result: 'Too High' | 'Too Low' }[]>([]);

  // Score persistence
  const [finalScore, setFinalScore] = useState(0);

  // Kiosk mode countdown
  const [countdown, setCountdown] = useState(15);

  // Top 3 celebration popup state
  const [showCelebration, setShowCelebration] = useState(false);
  const [achievedRank, setAchievedRank] = useState<number>(0);

  // Scoring matrix based on attempts
  const getScoreForAttempt = (attempt: number) => {
    const scores = [100, 90, 80, 70, 60, 50, 40];
    return scores[attempt - 1] || 0;
  };

  const handleRestart = () => {
    playClick();
    setGameState('start');
    setCurrentGuess('');
    setFeedback('');
    setGuessHistory([]);
  };

  const getTheoreticalProbability = () => {
    const rem = 100 - guessHistory.length;
    return (1 / Math.max(1, rem) * 100).toFixed(1);
  };

  const initGame = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const secret = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(secret);
    setAttemptsUsed(0);
    setCurrentGuess('');
    setFeedback('');
    setGuessHistory([]);
    setFinalScore(0);
    setShowCelebration(false);
    
    setGameState('playing');
    incrementGamesPlayed('probability_challenge');
  };

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const guess = parseInt(currentGuess);
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setFeedback('Please enter a valid number between 1 and 100.');
      playError();
      return;
    }

    const nextAttempts = attemptsUsed + 1;
    setAttemptsUsed(nextAttempts);

    if (guess === targetNumber) {
      // WIN STATE
      playChime();
      const score = getScoreForAttempt(nextAttempts);
      setFinalScore(score);
      incrementGamesWon('probability_challenge', score);

      // Save to leaderboard immediately
      const finalName = username.trim() || 'Visitor';
      addLeaderboardEntry({
        username: finalName,
        game: 'probability_challenge',
        score,
        duration: nextAttempts * 4,
        difficulty: 'medium'
      });

      // Synchronously check if this score qualifies for the Top 3
      const tempLeaderboard = [...leaderboard, { score, username: finalName } as any]
        .sort((a, b) => b.score - a.score);
      const newRank = tempLeaderboard.findIndex(item => item.score === score && item.username === finalName) + 1;

      if (newRank <= 3) {
        setAchievedRank(newRank);
        setShowCelebration(true);
      }

      setGameState('won');
    } else {
      playError();
      const result = guess > targetNumber ? 'Too High' as const : 'Too Low' as const;
      setFeedback(result);
      setGuessHistory(prev => [...prev, { attempt: nextAttempts, guess, result }]);
      setCurrentGuess('');

      if (nextAttempts >= maxAttempts) {
        // LOSE STATE
        setGameState('lost');
      }
    }
  };

  const returnToHome = () => {
    playClick();
    navigate('/');
  };

  const goToLeaderboard = () => {
    playClick();
    navigate('/leaderboard');
  };

  // Kiosk mode countdown redirect
  useEffect(() => {
    if (gameState !== 'won' && gameState !== 'lost') return;

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
      {/* Confetti celebration on victory */}
      {gameState === 'won' && <Confetti />}

      {/* Top 3 Celebration Popup Modal */}
      <Modal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        title="🏆 High Score Achievement!"
        size="md"
        footer={
          <div className="flex gap-3 w-full">
            <Button variant="math" fullWidth onClick={goToLeaderboard}>
              View Leaderboard
            </Button>
            <Button variant="outline" fullWidth onClick={returnToHome}>
              Return To Home
            </Button>
          </div>
        }
      >
        <div className="text-center space-y-6 py-4">
          <span className="text-6xl block animate-bounce">🎉</span>
          <h2 className="text-3xl font-black text-indigo-650 dark:text-indigo-400">
            Congratulations!
          </h2>
          <p className="text-lg font-bold text-slate-700 dark:text-slate-200">
            You are now in the Top 3 Players!
          </p>
          
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 max-w-xs mx-auto space-y-2">
            <span className="text-xs text-amber-500 uppercase tracking-widest font-black block">Leaderboard Standing</span>
            <div className="text-4xl font-extrabold text-slate-800 dark:text-white">
              {achievedRank === 1 ? '🥇 1st Place' : achievedRank === 2 ? '🥈 2nd Place' : '🥉 3rd Place'}
            </div>
            <span className="text-xs text-slate-450 block font-bold">Score: {finalScore} pts</span>
          </div>

          <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 max-w-sm mx-auto leading-relaxed">
            Please collect your chocolate reward from the exhibition team.
          </p>
        </div>
      </Modal>

      {/* START SCREEN */}
      {gameState === 'start' && (
        <Card mathTheme className="p-8 md:p-12 border-2 border-teal-100 dark:border-slate-800 shadow-xl max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-5xl block animate-bounce" role="img" aria-label="target">🎯</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              How To Play
            </h1>
          </div>

          {/* Simple step-by-step instructions */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="w-10 h-10 rounded-full bg-teal-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0">1</span>
              <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">The computer chooses a secret number.</span>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="w-10 h-10 rounded-full bg-teal-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0">2</span>
              <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">Guess the number.</span>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="w-10 h-10 rounded-full bg-teal-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0 mt-0.5">3</span>
              <div className="space-y-1">
                <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 block">Use hints:</span>
                <ul className="text-sm font-extrabold text-slate-500 list-disc list-inside space-y-0.5 pl-1">
                  <li>Too High</li>
                  <li>Too Low</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <span className="w-10 h-10 rounded-full bg-teal-500 text-white font-extrabold flex items-center justify-center text-lg shrink-0">4</span>
              <span className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">Find the number within 7 attempts.</span>
            </div>
          </div>

          <form onSubmit={initGame} className="space-y-6 max-w-md mx-auto">
            {/* Competitor Username input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block text-center">
                Competitor Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter player name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-center font-bold text-lg transition-all shadow-inner"
              />
            </div>

            <Button variant="math" fullWidth type="submit" className="py-5 text-xl font-black rounded-2xl shadow-lg shadow-teal-500/10 bg-teal-600 hover:bg-teal-700 border-none text-white">
              Start Game
            </Button>
          </form>
        </Card>
      )}

      {/* PLAYING SCREEN */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="md:col-span-2">
            <Card mathTheme className="p-8 md:p-10 text-center space-y-8 h-full flex flex-col justify-between border-2 border-teal-105 dark:border-slate-800">
              
              <div className="flex justify-between items-center">
                <Badge variant="primary" size="md" className="py-1.5 px-3.5 text-xs sm:text-sm font-extrabold font-mono bg-teal-500/10 text-teal-605">
                  Attempt {attemptsUsed + 1} of {maxAttempts}
                </Badge>
                
                <div className="text-xs sm:text-sm font-mono font-bold text-amber-500 uppercase tracking-wider">
                  Score Value: {getScoreForAttempt(attemptsUsed + 1)} pts
                </div>
              </div>

              <form onSubmit={handleGuessSubmit} className="max-w-md mx-auto space-y-6 py-4 w-full">
                <div className="space-y-2">
                  <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest block font-bold">Submit Your Guess</span>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    placeholder="Enter number (1-100)"
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:border-teal-500 text-center font-mono font-extrabold text-3xl sm:text-4xl shadow-inner"
                  />
                </div>

                <Button variant="math" size="lg" fullWidth type="submit" className="py-4.5 text-lg font-black rounded-2xl bg-teal-600 hover:bg-teal-700 text-white border-none">
                  Submit Guess
                </Button>

                {feedback && (
                  <div className={`p-4 rounded-2xl border flex items-center justify-center gap-2 text-sm sm:text-base font-black
                    ${
                      feedback.includes('High') 
                        ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-700 dark:text-rose-400' 
                        : 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-455'
                    }
                  `}>
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{feedback === 'Too High' ? 'Too High! Lower your next guess.' : 'Too Low! Raise your next guess.'}</span>
                  </div>
                )}
              </form>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  Player: <strong className="text-teal-600 dark:text-teal-400">{username || 'Visitor'}</strong>
                </span>
                <Button variant="secondary" size="sm" onClick={handleRestart}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Restart Game
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar logs & helper odds */}
          <div className="md:col-span-1 space-y-6">
            <Card className="p-6 overflow-hidden flex flex-col justify-between border border-slate-200 dark:border-slate-800">
              <div className="space-y-1 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Attempts Log
                </h3>
                <p className="text-xs text-slate-400">Previous Guess Results</p>
              </div>

              <div className="flex-grow py-4 overflow-y-auto max-h-[200px] md:max-h-none space-y-2.5 font-mono text-xs">
                {guessHistory.length > 0 ? (
                  guessHistory.map((item) => (
                    <div key={item.attempt} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                      <div>
                        <span className="font-extrabold text-teal-500 mr-2">Try #{item.attempt}</span>
                        <span className="font-bold text-slate-805 dark:text-slate-205">{item.guess}</span>
                      </div>
                      <Badge variant={item.result === 'Too High' ? 'danger' : 'warning'} size="sm" className="px-1.5">
                        {item.result}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-slate-400 font-sans">
                    No attempts registered yet.
                  </div>
                )}
              </div>
            </Card>

            {/* Odds Helper */}
            <Card className="p-4 bg-emerald-950/5 dark:bg-emerald-950/20 border-emerald-150 dark:border-emerald-900/40 text-xs">
              <span className="font-bold text-emerald-650 dark:text-emerald-400 block mb-1">Stochastic Calculation:</span>
              <p className="text-slate-500 leading-normal mb-2">
                Eliminating values shifts correct guess odds to:
              </p>
              <div className="text-lg font-bold font-mono text-emerald-500">
                ~ {getTheoreticalProbability()}%
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* RESULTS SCREEN */}
      {(gameState === 'won' || gameState === 'lost') && (
        <Card mathTheme className="max-w-2xl mx-auto p-8 md:p-12 border-2 border-teal-100 dark:border-slate-800 shadow-xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Results Screen</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              The Mathematics Behind Guessing
            </h1>
          </div>

          {/* Simple Explanation text exactly from user description */}
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-850 text-base sm:text-lg text-slate-655 dark:text-slate-300 leading-relaxed font-semibold space-y-3">
            <p>
              Efficient guessing uses strategy rather than luck.
            </p>
            <p>
              Each guess should eliminate as many possibilities as possible.
            </p>
            <p>
              This idea comes from probability and search algorithms.
            </p>
          </div>

          {/* Results stats */}
          <div className="grid grid-cols-2 gap-6 max-w-md mx-auto text-center">
            <div className="p-6 rounded-2xl bg-teal-50/50 dark:bg-slate-900 border-2 border-teal-100/50 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-bold uppercase tracking-wide mb-1">Attempts Used</span>
              <span className="text-4xl font-extrabold font-mono text-teal-650 dark:text-teal-400">{attemptsUsed}</span>
            </div>
            <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-slate-900 border-2 border-amber-100/50 dark:border-slate-800">
              <span className="text-xs text-slate-400 block font-bold uppercase tracking-wide mb-1">Final Score</span>
              <span className="text-4xl font-extrabold font-mono text-amber-500">{finalScore}</span>
            </div>
          </div>

          {/* Best Strategy Explanation */}
          <div className="p-4 bg-indigo-50/55 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <strong className="text-indigo-650 dark:text-indigo-400 block mb-1">Best Strategy Explanation:</strong>
            To guess in the fewest turns, always divide the remaining possibilities in half (Binary Search). This guarantees finding the secret number in at most 7 attempts.
          </div>

          {/* Kiosk Mode Auto-redirect indicator */}
          <div className="text-center text-xs sm:text-sm font-extrabold text-indigo-500/80 animate-pulse">
            Returning to Home Screen in {countdown} seconds...
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Button
              variant="math"
              fullWidth
              onClick={returnToHome}
              className="py-5 text-xl font-black rounded-2xl shadow-lg shadow-teal-500/10 cursor-pointer"
            >
              Return Now
            </Button>
            
            <Button
              variant="secondary"
              fullWidth
              onClick={handleRestart}
              className="py-5 text-xl font-black rounded-2xl cursor-pointer border border-slate-350"
            >
              Play Again
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
