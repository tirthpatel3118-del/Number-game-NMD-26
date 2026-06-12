import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
}

export const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6', '#8b5cf6'];
    
    // Generate initial particles
    const initialParticles = Array.from({ length: 80 }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100, // percentage of viewport width
      y: -10 - Math.random() * 20, // start above screen
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 2 + 1.5,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2,
    }));

    setParticles(initialParticles);

    // Animation loop
    let animationFrameId: number;
    const update = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speedY,
            x: p.x + p.speedX,
            rotation: p.rotation + p.rotSpeed,
          }))
          .filter((p) => p.y < 110) // discard when past bottom of screen
      );
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    // Cleanup after 4 seconds
    const timer = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      setParticles([]);
    }, 4000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.85,
            transition: 'opacity 0.2s',
          }}
        />
      ))}
    </div>
  );
};
