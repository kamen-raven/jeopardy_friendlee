'use client';

import React, { useEffect, useState } from 'react';
import styles from './StartScreen.module.scss';
import FriendLeeLogo from '../../assets/logo.svg';
import ArrowIcon from '@assets/arrow.svg';
import FroggyImage from '@assets/froggy.png';
import Image from 'next/image';

export interface StartGameInterface {
  onStartGame: () => void;
  isAnimating?: boolean;
}


const StartScreen: React.FC<StartGameInterface> = ({ onStartGame, isAnimating = false }) => {
  const [froggyVisible, setFroggyVisible] = useState(false);

  useEffect(() => {
    // После завершения начальной анимации устанавливаем флаг
    const timer = setTimeout(() => {
      setFroggyVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.startGame}`}>
      <div className={`${styles.wrapper} ${isAnimating ? styles.animating : ''}`}>

        <div className={`${styles.logo} ${isAnimating ? styles.animating : ''}`}>
          <FriendLeeLogo />
        </div>


        <h1 className={`${styles.title} ${isAnimating ? styles.animating : ''}`}>
          С <span className={styles.title__highlight}>Новым</span> Годом!
        </h1>

        <button
          type='button'
          className={`${styles.startButton} ${isAnimating ? styles.animating : ''}`}
          onClick={onStartGame}
          disabled={!froggyVisible || isAnimating}
        >
          Начать игру
          <ArrowIcon />
        </button>
      </div>

      <div className={`${styles.froggy} ${froggyVisible ? styles.visible : ''} ${isAnimating ? styles.animating : ''}`}>
        <Image src={FroggyImage} alt="Froggy" />
      </div>

    </div>
  );
};

export { StartScreen };