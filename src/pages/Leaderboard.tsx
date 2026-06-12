import React, { useState } from 'react';
import { Trophy, Trash2, ShieldAlert, Star } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useGame } from '../context/GameContext';

export const Leaderboard: React.FC = () => {
  const { leaderboard, resetStats } = useGame();
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // 1. Sort scores descending (highest first)
  const sortedScores = [...leaderboard].sort((a, b) => b.score - a.score || a.duration - b.duration);

  // 2. Extract Top 3 (Chocolate Reward Winners)
  const topThree = sortedScores.slice(0, 3);

  // 3. Extract the rest of Top 10
  const topTen = sortedScores.slice(0, 10);

  // Helper to map score to attempts/steps
  const getAttemptsDisplay = (item: typeof leaderboard[0]) => {
    if (item.game === 'mind_reader') {
      // Mind reader score formula: Math.max(100, 1000 - (steps - 1) * 100)
      // Reverse: score = 1000 - (steps-1)*100 -> steps = (1000 - score)/100 + 1
      const steps = Math.round((1000 - item.score) / 100) + 1;
      return `${Math.max(1, Math.min(7, steps))} Steps`;
    } else {
      // Probability challenge attempts mapping (Mock duration = attempts * 4, so attempts = duration / 4)
      const attempts = Math.round(item.duration / 4);
      return `${Math.max(1, Math.min(7, attempts))} Attempts`;
    }
  };

  const handleClearLeaderboard = () => {
    resetStats();
    setShowConfirmReset(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10 font-sans select-none">
      <PageHeader
        title="Leaderboard & Champions"
        subtitle="Track the top mathematical minds of the exhibition. Rankings update automatically after every game."
        icon={<Trophy className="w-6 h-6 text-amber-500" />}
      />

      {/* CHOCOLATE REWARD WINNERS SECTION */}
      <div className="space-y-4">
        <div className="text-center md:text-left">
          <Badge variant="gold" size="md" className="py-1 px-3.5 text-xs font-black uppercase tracking-widest bg-amber-500/10 text-amber-500">
            Exhibition Special
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            🍫 Chocolate Reward Winners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            The Top 3 players are entitled to collect a sweet reward from the booth staff!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rank 1: Gold Winner */}
          <Card 
            mathTheme 
            className={`p-6 border-2 flex flex-col justify-between items-center text-center space-y-4 rounded-3xl relative overflow-hidden transition-all hover:scale-[1.02]
              ${topThree[0] 
                ? 'border-amber-400 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent shadow-xl shadow-amber-500/5' 
                : 'border-slate-200 dark:border-slate-800 opacity-60'
              }
            `}
          >
            <div className="absolute top-3 right-3 text-4xl font-black opacity-10 font-mono">#1</div>
            <span className="text-5xl block animate-pulse">🥇</span>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 block">Rank 1 (Gold)</span>
              <h3 className="text-2xl font-black text-slate-850 dark:text-white truncate max-w-[200px] mt-1">
                {topThree[0] ? topThree[0].username : 'Waiting for Player...'}
              </h3>
            </div>
            {topThree[0] && (
              <div className="space-y-1 bg-amber-500/10 dark:bg-slate-900 border border-amber-500/20 px-4 py-2.5 rounded-2xl w-full">
                <span className="text-2xl font-mono font-black text-amber-500 block">{topThree[0].score} pts</span>
                <span className="text-xs text-slate-500 font-bold block">{getAttemptsDisplay(topThree[0])}</span>
              </div>
            )}
          </Card>

          {/* Rank 2: Silver Winner */}
          <Card 
            mathTheme 
            className={`p-6 border-2 flex flex-col justify-between items-center text-center space-y-4 rounded-3xl relative overflow-hidden transition-all hover:scale-[1.02]
              ${topThree[1] 
                ? 'border-slate-400 bg-gradient-to-b from-slate-400/10 via-transparent to-transparent shadow-xl' 
                : 'border-slate-200 dark:border-slate-800 opacity-60'
              }
            `}
          >
            <div className="absolute top-3 right-3 text-4xl font-black opacity-10 font-mono">#2</div>
            <span className="text-5xl block">🥈</span>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 block">Rank 2 (Silver)</span>
              <h3 className="text-2xl font-black text-slate-850 dark:text-white truncate max-w-[200px] mt-1">
                {topThree[1] ? topThree[1].username : 'Waiting for Player...'}
              </h3>
            </div>
            {topThree[1] && (
              <div className="space-y-1 bg-slate-400/10 dark:bg-slate-900 border border-slate-400/20 px-4 py-2.5 rounded-2xl w-full">
                <span className="text-2xl font-mono font-black text-slate-500 dark:text-slate-450 block">{topThree[1].score} pts</span>
                <span className="text-xs text-slate-500 font-bold block">{getAttemptsDisplay(topThree[1])}</span>
              </div>
            )}
          </Card>

          {/* Rank 3: Bronze Winner */}
          <Card 
            mathTheme 
            className={`p-6 border-2 flex flex-col justify-between items-center text-center space-y-4 rounded-3xl relative overflow-hidden transition-all hover:scale-[1.02]
              ${topThree[2] 
                ? 'border-amber-700/40 bg-gradient-to-b from-amber-700/10 via-transparent to-transparent shadow-xl' 
                : 'border-slate-200 dark:border-slate-800 opacity-60'
              }
            `}
          >
            <div className="absolute top-3 right-3 text-4xl font-black opacity-10 font-mono">#3</div>
            <span className="text-5xl block">🥉</span>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-750 block">Rank 3 (Bronze)</span>
              <h3 className="text-2xl font-black text-slate-850 dark:text-white truncate max-w-[200px] mt-1">
                {topThree[2] ? topThree[2].username : 'Waiting for Player...'}
              </h3>
            </div>
            {topThree[2] && (
              <div className="space-y-1 bg-amber-700/10 dark:bg-slate-900 border border-amber-700/20 px-4 py-2.5 rounded-2xl w-full">
                <span className="text-2xl font-mono font-black text-amber-700 dark:text-amber-600 block">{topThree[2].score} pts</span>
                <span className="text-xs text-slate-500 font-bold block">{getAttemptsDisplay(topThree[2])}</span>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* TOP 10 RANKINGS TABLE */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-850 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-500" /> Full Top 10 Leaderboard
          </h3>

          {/* Kiosk Mode Staff reset button */}
          {!showConfirmReset ? (
            <Button variant="danger" size="sm" onClick={() => setShowConfirmReset(true)} className="rounded-xl">
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Reset Board
            </Button>
          ) : (
            <div className="flex items-center gap-2 p-1.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-105 dark:border-rose-900/30 rounded-xl text-xs">
              <span className="text-rose-700 dark:text-rose-455 font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> Confirm Reset?
              </span>
              <button
                onClick={handleClearLeaderboard}
                className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-[10px] font-black cursor-pointer"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-2.5 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-black cursor-pointer"
              >
                No
              </button>
            </div>
          )}
        </div>

        <Card className="p-0 overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 text-xs font-black uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-center w-24">Rank</th>
                  <th className="px-6 py-4">Player Name</th>
                  <th className="px-6 py-4">Game Mode</th>
                  <th className="px-6 py-4">Attempts / Steps</th>
                  <th className="px-6 py-4 text-right pr-8">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-105 dark:divide-slate-800/80 text-sm font-semibold">
                {topTen.length > 0 ? (
                  topTen.map((item, idx) => {
                    const isTopThree = idx < 3;
                    const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : null;
                    
                    return (
                      <tr 
                        key={item.id} 
                        className={`hover:bg-slate-50/30 dark:hover:bg-slate-900/20 transition-colors
                          ${isTopThree ? 'font-black bg-indigo-50/10 dark:bg-indigo-950/5' : ''}
                        `}
                      >
                        <td className="px-6 py-4 text-center font-mono text-base font-extrabold">
                          {medal || `#${idx + 1}`}
                        </td>
                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100 text-base">
                          {item.username}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={item.game === 'mind_reader' ? 'primary' : 'success'} size="sm">
                            {item.game === 'mind_reader' ? 'Mind Reader' : 'Probability'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">
                          {getAttemptsDisplay(item)}
                        </td>
                        <td className="px-6 py-4 text-right pr-8 font-mono text-lg font-black text-indigo-600 dark:text-indigo-400">
                          {item.score}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No game runs completed yet. Be the first to claim a rank!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

    </div>
  );
};
