import React, { useRef, useState } from 'react';
import styles from './TeamCard.module.scss';
import RefreshIcon from '@assets/refresh.svg';
import EditIcon from '@assets/edit.svg';
import ArrowIcon from '@assets/arrow.svg';
import { Team } from '../../TeamBoard';
import cn from 'classnames';


interface TeamCardProps {
  team: Team;
  maxScore: number;
  onNameChange: (teamId: number, newName: string) => void;
  onScoreAdd: (teamId: number, points: number) => void;
  onScoreReset: (teamId: number) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, maxScore, onNameChange, onScoreAdd, onScoreReset }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scoreInput, setScoreInput] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }, 0);
  };

  const handleEditBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const newName = e.target.value.trim() || `Команда ${team.id}`;
    onNameChange(team.id, newName);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
      e.currentTarget.value = team.name;
      e.currentTarget.blur();
    }
  };

  const handleScoreSubmit = () => {
    const points = parseInt(scoreInput, 10);
    if (!isNaN(points) && points > 0) {
      onScoreAdd(team.id, points);
      setScoreInput('');
    }
  };

  const handleScoreKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleScoreSubmit();
    }
  };

  return (
    <div className={cn(styles.teamCard, {
      [styles.teamCard_blue]: team.id === 1,
      [styles.teamCard_pink]: team.id === 2,
      [styles.teamCard_green]: team.id === 3,
      [styles.teamCard_orange]: team.id === 4,
    })}>

      <div
        className={styles.teamNameWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            className={styles.teamNameInput}
            defaultValue={team.name}
            onBlur={handleEditBlur}
            onKeyDown={handleEditKeyDown}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <>
            <h3 className={styles.teamName}>
              {team.name}
            </h3>

            <button
              type="button"
              className={cn(styles.editNameButton, {
                [styles.editNameButton_hovered]: isHovered,
              })}
              onClick={handleEditClick}
              aria-label="Редактировать название команды"
            >
              <EditIcon />
            </button>
          </>
        )}
      </div>

      <div className={styles.contentWrapper}>

        <div className={styles.scoreInputWrapper}>
          <input
            type='text'
            className={styles.scoreInput}
            value={scoreInput}
            onChange={(e) => setScoreInput(e.target.value)}
            onKeyDown={handleScoreKeyDown}
            placeholder=""
            min="1"
          />

          <button
            type="button"
            className={styles.scoreAcceptButton}
            onClick={handleScoreSubmit}
            disabled={!scoreInput.trim()}
            aria-label="Принять очки"
          >
            <ArrowIcon />
          </button>
        </div>


        <p className={styles.scorePointsAll}>
          Счёт:&nbsp;
          <span className={`${team.score === maxScore && maxScore > 0 ? styles.scoreLeader : ''}`}>
            {team.score.toLocaleString('ru-RU')}
          </span>
        </p>

        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => onScoreReset(team.id)}
          aria-label="Обнулить счет"
        >
          <RefreshIcon />
        </button>
      </div>
    </div>
  );
};

export { TeamCard };