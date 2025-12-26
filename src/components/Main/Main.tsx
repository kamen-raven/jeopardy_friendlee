'use client';

import React, { useState } from 'react';
import { StartScreen } from '../StartScreen/StartScreen';
import { MyGame } from '../MyGame/MyGame';

const Main: React.FC = () => {
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
};

export { Main };