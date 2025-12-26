'use client';

import type { Question } from '@/types/types';
import { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import styles from './PopupQuestion.module.scss';
import CloseIcon from '../../../../assets/close.svg';
import ArrowIcon from '../../../../assets/arrow.svg';
import Image from 'next/image';

interface PopupQuestionProps {
  question: Question | null;
  isAnswerVisible: boolean;
  onShowAnswer: () => void;
  onHideAnswer: () => void;
  onClose: () => void;
}


const PopupQuestion = ({
  question,
  isAnswerVisible,
  onShowAnswer,
  onHideAnswer,
  onClose,
}: PopupQuestionProps) => {

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const scrollableNodeRef = useRef<HTMLElement | null>(null);
  const answerButtonRef = useRef<HTMLButtonElement | null>(null);

  //# закрытие попапа по Escape
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);


  //# скролл к ответу
  useEffect(() => {
    if (isAnswerVisible) {
      const scrollContainer = scrollableNodeRef.current;
      const answerButton = answerButtonRef.current;

      if (!scrollContainer || !answerButton) return;

      window.requestAnimationFrame(() => {
        const containerRect = scrollContainer.getBoundingClientRect();
        const buttonRect = answerButton.getBoundingClientRect();

        const buttonTopInContainer = buttonRect.top - containerRect.top;

        const targetTop = scrollContainer.scrollTop + buttonTopInContainer;

        scrollContainer.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      });
    }
  }, [isAnswerVisible]);

  //# закрытие попапа по клику на overlay
  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!question) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div className={styles.popup}>
        <button className={styles.closeButton}
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <CloseIcon />
        </button>


        <SimpleBar
          autoHide={false}
          className={styles.popupScroller}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
          classNames={{
            track: styles.scrollbarTrack,
            scrollbar: styles.scrollbar,
            contentEl: styles.popupContentContainer,
          }}
        >

          <h2 className={styles.title}>
            Вопрос за {question.point}
          </h2>

          <div className={styles.questionInner}>
            {question.question.text && (
              <p className={styles.questionInner__text}>
                {question.question.text}
              </p>
            )}
            {question.question.image && (
              <div className={styles.questionInner__image}>
                <Image
                  src={question.question.image}
                  alt={question.question.text || ''}
                  width={700}
                  height={470}
                />
              </div>
            )}
            {question.question.description && (
              <p className={styles.questionInner__description}>
                {question.question.description}
              </p>
            )}
          </div>


          <button
            ref={answerButtonRef}
            className={`${styles.answerButton} ${isAnswerVisible ? styles.answerButton__hide : styles.answerButton__show}`}
            type="button"
            onClick={isAnswerVisible ? onHideAnswer : onShowAnswer}
          >
            <span>
              {isAnswerVisible ? 'Скрыть ответ' : 'Показать ответ'}
            </span>
            <ArrowIcon />
          </button>


          {isAnswerVisible && (
            <div className={styles.answerInner}>
              {question.answer.text && (
                <p className={`${styles.answerInner__text} ${styles.answerInner__text_answer}`}>
                  {question.answer.text}
                </p>
              )}
              {question.answer.image && (
                <div className={styles.answerInner__image}>
                  <Image
                    src={question.answer.image}
                    alt={question.answer.text || ''}
                    width={700}
                    height={470}
                  />
                </div>
              )}
              {question.answer.description && (
                <p className={`${styles.answerInner__description} ${styles.answerInner__description_answer}`}>
                  {question.answer.description}
                </p>
              )}
            </div>
          )}
        </SimpleBar>
      </div>
    </div>
  );
};

export { PopupQuestion };


