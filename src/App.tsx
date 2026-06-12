import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { MindReader } from './pages/MindReader';
import { ProbabilityChallenge } from './pages/ProbabilityChallenge';
import { Leaderboard } from './pages/Leaderboard';
import { Statistics } from './pages/Statistics';
import { AboutMath } from './pages/AboutMath';

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mind-reader" element={<MindReader />} />
              <Route path="/probability" element={<ProbabilityChallenge />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/about" element={<AboutMath />} />
            </Routes>
          </MainLayout>
        </Router>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
