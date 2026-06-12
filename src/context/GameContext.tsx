import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LeaderboardEntry {
  id: string;
  username: string;
  game: 'mind_reader' | 'probability_challenge';
  score: number;
  duration: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  date: string;
}

export interface GameStats {
  gamesPlayed: {
    mind_reader: number;
    probability_challenge: number;
  };
  gamesWon: {
    mind_reader: number;
    probability_challenge: number;
  };
  bestScores: {
    mind_reader: number; // e.g., few steps to guess
    probability_challenge: number; // high score percentage or matches
  };
  totalTimeSeconds: number;
  currentStreak: number;
  lastPlayed: string;
}

interface GameContextType {
  leaderboard: LeaderboardEntry[];
  stats: GameStats;
  addLeaderboardEntry: (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => void;
  incrementGamesPlayed: (game: 'mind_reader' | 'probability_challenge') => void;
  incrementGamesWon: (game: 'mind_reader' | 'probability_challenge', score: number) => void;
  updateTimePlayed: (seconds: number) => void;
  resetStats: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Standard mock leaderboard entries matching famous mathematicians
const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb-1',
    username: 'Srinivasa Ramanujan',
    game: 'mind_reader',
    score: 1729,
    duration: 45,
    difficulty: 'hard',
    date: '2026-04-26'
  },
  {
    id: 'lb-2',
    username: 'Carl F. Gauss',
    game: 'probability_challenge',
    score: 98,
    duration: 32,
    difficulty: 'hard',
    date: '2026-05-15'
  },
  {
    id: 'lb-3',
    username: 'Ada Lovelace',
    game: 'mind_reader',
    score: 1250,
    duration: 55,
    difficulty: 'medium',
    date: '2026-06-01'
  },
  {
    id: 'lb-4',
    username: 'Alan Turing',
    game: 'probability_challenge',
    score: 92,
    duration: 40,
    difficulty: 'hard',
    date: '2026-06-05'
  },
  {
    id: 'lb-5',
    username: 'Emmy Noether',
    game: 'mind_reader',
    score: 1100,
    duration: 50,
    difficulty: 'hard',
    date: '2026-06-10'
  },
  {
    id: 'lb-6',
    username: 'Leonhard Euler',
    game: 'probability_challenge',
    score: 88,
    duration: 48,
    difficulty: 'medium',
    date: '2026-06-11'
  }
];

const INITIAL_STATS: GameStats = {
  gamesPlayed: {
    mind_reader: 12,
    probability_challenge: 8
  },
  gamesWon: {
    mind_reader: 8,
    probability_challenge: 5
  },
  bestScores: {
    mind_reader: 1450,
    probability_challenge: 85
  },
  totalTimeSeconds: 3600, // 1 hour
  currentStreak: 4,
  lastPlayed: '2026-06-12'
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem('math_leaderboard');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Verify each entry has a score field
          const valid = parsed.filter(item => item && typeof item === 'object' && 'score' in item);
          if (valid.length > 0) return valid;
        }
      }
    } catch (e) {
      console.error('Failed to parse leaderboard from localStorage', e);
    }
    return INITIAL_LEADERBOARD;
  });

  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('math_stats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.gamesPlayed && parsed.gamesWon) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse stats from localStorage', e);
    }
    return INITIAL_STATS;
  });

  useEffect(() => {
    localStorage.setItem('math_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('math_stats', JSON.stringify(stats));
  }, [stats]);

  const addLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
    const newEntry: LeaderboardEntry = {
      ...entry,
      id: `lb-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setLeaderboard((prev) => {
      const updated = [...prev, newEntry];
      // Sort: highest score first, then lowest duration
      return updated.sort((a, b) => b.score - a.score || a.duration - b.duration).slice(0, 50);
    });
  };

  const incrementGamesPlayed = (game: 'mind_reader' | 'probability_challenge') => {
    setStats((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastPlayed !== today;
      return {
        ...prev,
        gamesPlayed: {
          ...prev.gamesPlayed,
          [game]: prev.gamesPlayed[game] + 1
        },
        currentStreak: isNewDay ? prev.currentStreak + 1 : prev.currentStreak,
        lastPlayed: today
      };
    });
  };

  const incrementGamesWon = (game: 'mind_reader' | 'probability_challenge', score: number) => {
    setStats((prev) => ({
      ...prev,
      gamesWon: {
        ...prev.gamesWon,
        [game]: prev.gamesWon[game] + 1
      },
      bestScores: {
        ...prev.bestScores,
        [game]: Math.max(prev.bestScores[game], score)
      }
    }));
  };

  const updateTimePlayed = (seconds: number) => {
    setStats((prev) => ({
      ...prev,
      totalTimeSeconds: prev.totalTimeSeconds + seconds
    }));
  };

  const resetStats = () => {
    setStats({
      gamesPlayed: { mind_reader: 0, probability_challenge: 0 },
      gamesWon: { mind_reader: 0, probability_challenge: 0 },
      bestScores: { mind_reader: 0, probability_challenge: 0 },
      totalTimeSeconds: 0,
      currentStreak: 0,
      lastPlayed: ''
    });
    setLeaderboard(INITIAL_LEADERBOARD);
  };

  return (
    <GameContext.Provider
      value={{
        leaderboard,
        stats,
        addLeaderboardEntry,
        incrementGamesPlayed,
        incrementGamesWon,
        updateTimePlayed,
        resetStats
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
