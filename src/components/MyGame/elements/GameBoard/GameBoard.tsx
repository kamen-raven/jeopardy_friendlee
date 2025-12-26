import React from 'react';
import styles from './GameBoard.module.scss';
import type { Category, Question } from '@/types/types';

export interface GameBoardInterface {
  categories: Category[];
  answeredQuestionIds: Set<string>;
  onQuestionClick: (question: Question) => void;
}

const GameBoard: React.FC<GameBoardInterface> = ({
  categories,
  answeredQuestionIds,
  onQuestionClick,
}) => {

  // получаем вопросы по очкам и потом распределяем их по категориям
  const points = Array.from(
    new Set(categories.flatMap((category) => category.questions.map((q) => q.point))),
  ).sort((a, b) => a - b);

  return (
    <div className={styles.board}>

      {categories.map((category) => (
        <section key={category.id} className={styles.categorySection}>
          <h3 className={styles.categoryTitle}>
            {category.name}
          </h3>

          <ul className={styles.questions}>
            {points.map((point, idx) => {
              const question = category.questions.find((q) => q.point === point);

              if (!question) {
                return <li key={`${category.id}-${point}`} className={styles.emptyCell} />;
              }

              const isAnswered = answeredQuestionIds.has(question.id); // проверяем, есть ли этот вопрос в списке отвеченных
              const variantClass = idx % 2 === 0 ? styles.buttonLight : styles.buttonDark;

              return (
                <li key={question.id}>
                  <button
                    type="button"
                    className={`
                      ${styles.questionButton} 
                      ${variantClass} 
                      ${isAnswered ? styles.answered : ''}
                    `}
                    disabled={isAnswered}
                    onClick={() => onQuestionClick(question)}
                  >
                    {point}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export { GameBoard };