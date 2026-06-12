import React from 'react';
import { BarChart3, Binary, Compass, TrendingUp } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useGame } from '../context/GameContext';

export const Statistics: React.FC = () => {
  const { stats, leaderboard } = useGame();

  // Basic calculations
  const mrPlayed = stats.gamesPlayed.mind_reader;
  const mrWon = stats.gamesWon.mind_reader;
  const mrLosses = Math.max(0, mrPlayed - mrWon);

  const probPlayed = stats.gamesPlayed.probability_challenge;
  const probWon = stats.gamesWon.probability_challenge;
  const probLosses = Math.max(0, probPlayed - probWon);

  const totalPlayed = mrPlayed + probPlayed;
  const totalWon = mrWon + probWon;
  const totalLosses = mrLosses + probLosses;

  // Average Score from Leaderboard
  const averageScore = leaderboard.length > 0
    ? Math.round(leaderboard.reduce((sum, item) => sum + item.score, 0) / leaderboard.length)
    : 0;

  // Highest Score from Leaderboard
  const highestScore = leaderboard.length > 0
    ? Math.max(...leaderboard.map(item => item.score))
    : 0;

  // Binary Search Efficiency (Mocking average question counts, e.g. 5.4 steps out of 7)
  const averageQuestions = totalPlayed > 0 ? (5.3).toFixed(1) : '0';

  // Probability Challenge Performance (Average Win Rate)
  const probabilityPerformance = probPlayed > 0 ? Math.round((probWon / probPlayed) * 100) : 0;

  // Mock data for convergence coordinates [x, y] to draw an SVG chart
  // Represents Law of Large Numbers: coin tosses approaching 50%
  const chartPoints = [
    { trials: 10, pct: 70 },
    { trials: 50, pct: 44 },
    { trials: 100, pct: 58 },
    { trials: 500, pct: 52 },
    { trials: 1000, pct: 49 },
    { trials: 5000, pct: 50.4 },
    { trials: 10000, pct: 50.05 }
  ];

  // Map percentages to SVG coordinate system (Y goes 0 to 100, we want 50% in the middle)
  const svgWidth = 500;
  const svgHeight = 150;
  
  const getCoordinatesString = () => {
    return chartPoints.map((pt, index) => {
      const x = (index / (chartPoints.length - 1)) * (svgWidth - 40) + 20;
      // Map percentage (30% to 80% range) to height
      const y = svgHeight - ((pt.pct - 30) / (80 - 30)) * (svgHeight - 40) - 20;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 font-sans">
      <PageHeader
        title="Analytical Insights"
        subtitle="Detailed statistics of your numerical exploration. Compare mathematical performance metrics."
        icon={<BarChart3 className="w-6 h-6" />}
      />

      {/* Mathematics Dashboard KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Played */}
        <Card interactive className="p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Played</span>
          <span className="text-3xl font-extrabold font-mono text-indigo-650 dark:text-indigo-400 mt-2">{totalPlayed}</span>
          <span className="text-[10px] text-slate-500 mt-1">Runs completed</span>
        </Card>

        {/* Total Wins */}
        <Card interactive className="p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Wins</span>
          <span className="text-3xl font-extrabold font-mono text-emerald-500 mt-2">{totalWon}</span>
          <span className="text-[10px] text-slate-500 mt-1">Successful predictions</span>
        </Card>

        {/* Total Losses */}
        <Card interactive className="p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Losses</span>
          <span className="text-3xl font-extrabold font-mono text-rose-500 mt-2">{totalLosses}</span>
          <span className="text-[10px] text-slate-500 mt-1">Out-partitioned</span>
        </Card>

        {/* Average Score */}
        <Card interactive className="p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">Average Score</span>
          <span className="text-3xl font-extrabold font-mono text-amber-500 mt-2">{averageScore}</span>
          <span className="text-[10px] text-slate-500 mt-1">All-time arithmetic mean</span>
        </Card>

        {/* Highest Score */}
        <Card interactive className="p-4 flex flex-col justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">Highest Score</span>
          <span className="text-3xl font-extrabold font-mono text-indigo-650 dark:text-indigo-400 mt-2">{highestScore}</span>
          <span className="text-[10px] text-slate-500 mt-1">Peak peak record</span>
        </Card>
      </div>

      {/* Game Performance Cards & Progress bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Binary Search Efficiency Card */}
        <Card 
          title={
            <span className="flex items-center gap-2">
              <Binary className="w-5 h-5 text-indigo-500" />
              Binary Search Efficiency
            </span>
          }
          subtitle="Measures splits required to isolate numbers"
          mathTheme
        >
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold font-mono text-slate-800 dark:text-white">
                  {averageQuestions}
                </span>
                <span className="text-xs text-slate-500"> / 7.0 avg steps</span>
              </div>
              <Badge variant="teal">O(log n) Limit</Badge>
            </div>

            {/* Progress Bar of Efficiency */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Computational Speed</span>
                <span>Optimized</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-650 h-full transition-all duration-500" 
                  style={{ width: `${totalPlayed > 0 ? 84 : 0}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                An average of {averageQuestions} queries indicates search trees are being successfully halved. Maximum theoretic limit is 7.
              </p>
            </div>
          </div>
        </Card>

        {/* Probability Challenge Performance Card */}
        <Card 
          title={
            <span className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-555" />
              Probability Performance
            </span>
          }
          subtitle="Analysis of statistical matches"
          mathTheme
        >
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-extrabold font-mono text-slate-850 dark:text-white">
                  {probabilityPerformance}%
                </span>
                <span className="text-xs text-slate-550"> success rate</span>
              </div>
              <Badge variant="primary">Stochastic Bounds</Badge>
            </div>

            {/* Progress Bar of Performance */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-505">
                <span>Convergence Precision</span>
                <span>{probabilityPerformance}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-500" 
                  style={{ width: `${probabilityPerformance}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                Measures success frequencies in Monty Hall choices. Swappers average 66.7% success rates.
              </p>
            </div>
          </div>
        </Card>

      </div>

      {/* SVG Dashboard Convergence Chart */}
      <Card 
        title={
          <span className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            Convergence Chart (Law of Large Numbers)
          </span>
        }
        subtitle="As trials grow, outcome distribution stabilizes at the 50% limit"
        mathTheme
      >
        <div className="space-y-6 font-sans">
          {/* Responsive SVG Container */}
          <div className="w-full overflow-hidden bg-slate-900 rounded-2xl p-4 border border-slate-800">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-auto overflow-visible"
            >
              {/* Grid Lines */}
              <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="#1e293b" strokeDasharray="4" />
              <line x1="20" y1="75" x2={svgWidth - 20} y2="75" stroke="#475569" strokeDasharray="2" />
              <line x1="20" y1="130" x2={svgWidth - 20} y2="130" stroke="#1e293b" strokeDasharray="4" />

              {/* Labels */}
              <text x="25" y="18" fill="#64748b" className="text-[8px] font-mono">80% Bound</text>
              <text x="25" y="71" fill="#94a3b8" className="text-[9px] font-mono">Expected Mean (50%)</text>
              <text x="25" y="127" fill="#64748b" className="text-[8px] font-mono">30% Bound</text>

              {/* Connecting Path Line */}
              <polyline
                fill="none"
                stroke="url(#chartGradient)"
                strokeWidth="3.5"
                points={getCoordinatesString()}
                className="transition-all duration-1000"
              />

              {/* Data points dots */}
              {chartPoints.map((pt, idx) => {
                const x = (idx / (chartPoints.length - 1)) * (svgWidth - 40) + 20;
                const y = svgHeight - ((pt.pct - 30) / (80 - 30)) * (svgHeight - 40) - 20;
                return (
                  <g key={idx} className="group cursor-pointer">
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="4" 
                      fill="#f59e0b" 
                      stroke="#1e1b4b" 
                      strokeWidth="1.5"
                    />
                    <text 
                      x={x} 
                      y={y - 8} 
                      fill="#e2e8f0" 
                      textAnchor="middle" 
                      className="text-[7px] font-mono opacity-80"
                    >
                      {pt.pct}%
                    </text>
                  </g>
                );
              })}

              {/* Gradients */}
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] text-slate-500 font-mono">
            <div>Trials: 10</div>
            <div>Trials: 100</div>
            <div>Trials: 1000</div>
            <div>Trials: 10000</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
