import React from 'react';
import styles from './GameTitle.module.scss';
import FriendLeeLogo from '../../../../assets/logo.svg';

const GameTitle = () => {
  return (
    <div className={styles.title}>
      <h2>
        Своя игра
      </h2>
      <FriendLeeLogo />
    </div>
  );
};

export { GameTitle };