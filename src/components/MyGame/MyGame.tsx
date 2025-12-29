'use client';

import { useMemo, useState } from 'react';
import questionsData from '../../data/questions.json';
import styles from './MyGame.module.scss';
import type { GameData, Question } from '../../types/types';
import { GameBoard } from './elements/GameBoard/GameBoard';
import { GameTitle, PopupQuestion } from './elements';
import { TeamBoard } from '../TeamBoard/TeamBoard';

const MyGame = () => {
  const gameData = useMemo(() => questionsData as GameData, []);

  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<string>>(() => new Set());
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);


  //# открытие / закрытие попапа с вопросом
  const openQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setIsAnswerVisible(false);
  };

  const closeQuestion = () => {
    if (selectedQuestion) {
      setAnsweredQuestionIds((prev) => {
        const next = new Set(prev);
        next.add(selectedQuestion.id);
        return next;
      });
    }

    setSelectedQuestion(null);
    setIsAnswerVisible(false);
  };


  //# кнопка Показать / Скрыть ответ
  const toggleAnswer = (isAnswerVisible: boolean) => {
    if (!selectedQuestion) return;
    setIsAnswerVisible(!isAnswerVisible);
  };


  return (
    <div className={styles.myGame}>
      <GameTitle />

      <GameBoard
        categories={gameData.categories}
        answeredQuestionIds={answeredQuestionIds}
        onQuestionClick={openQuestion}
      />

      {selectedQuestion && (
        <PopupQuestion
          question={selectedQuestion}
          isAnswerVisible={isAnswerVisible}
          onToggleAnswer={toggleAnswer}
          onClose={closeQuestion}
        />
      )}

      <TeamBoard />
    </div>
  );
};

export { MyGame };
