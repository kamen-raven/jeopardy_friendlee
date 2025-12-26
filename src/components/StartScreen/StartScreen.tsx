'use client';

import React from 'react';
import styles from './StartScreen.module.scss';
import FriendLeeLogo from '@assets/Logo.svg';
import ArrowIcon from '@assets/arrow.svg';

export interface StartGameInterface {
  onStartGame: () => void;
  isAnimating?: boolean;
}


const StartScreen: React.FC<StartGameInterface> = ({ onStartGame, isAnimating = false }) => {
  return (
    <div className={`${styles.startGame} ${isAnimating ? styles.animating : ''}`}>
      <div className={styles.logo}>
        <FriendLeeLogo />
      </div>


      <h1 className={`${styles.title} ${isAnimating ? styles.animating : ''}`}>
        С <span className={styles.title__highlight}>Новым</span> Годом!
      </h1>

      <button
        className={`${styles.startButton} ${isAnimating ? styles.animating : ''}`}
        onClick={onStartGame}
        disabled={isAnimating}
      >
        Начать игру
        <ArrowIcon />
      </button>

    </div>
  );
};

export { StartScreen };