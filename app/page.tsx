'use client';

import React, { useState } from 'react';
import { StartScreen, MyGame } from '@/components';


export default function Home(): React.ReactNode {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'game'>('game');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartGame = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentScreen('game');
      setIsAnimating(false);
    }, 100);
  }

  return (
    <>
      {currentScreen === 'start' && (
        <StartScreen onStartGame={handleStartGame} isAnimating={isAnimating} />
      )}
      {currentScreen === 'game' && (
        <MyGame />
      )}
    </>
  );
}