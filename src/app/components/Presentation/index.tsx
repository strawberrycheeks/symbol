import React, { useState } from 'react';
import Image from 'next/image';
import Slide from '@/app/components/Slide';
import styles from './styles.module.css';
import { getPresentationTitle, getSlideContent, getTotalSlidesNumber } from '@/app/utils/getPresentationContent';

const ICON_SIZE = 24;

const Presentation = () => {
  const title = getPresentationTitle();
  const totalSlides = getTotalSlidesNumber();
  const [slide, setSlide] = useState(1);

  const handleFirstSlideClick = () => setSlide(1);

  const handlePrevSlideClick = () => {
    if (slide === 1) {
      return;
    }
    setSlide(state => state - 1);
  };

  const handleNextSlideClick = () => {
    if (slide === totalSlides) {
      return;
    }
    setSlide(state => state + 1);
  };

  const handleLastSlideClick = () => setSlide(totalSlides);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        {slide === 1 ? <Slide {...getSlideContent(slide)} type='title' /> : <Slide {...getSlideContent(slide)} />}
      </div>
      <div className={styles.footer}>
        <span>{title}</span>
        <div className={styles.pagination}>
          <button onClick={handleFirstSlideClick} className={styles.button}>
            <Image src='/double-arrow.svg' alt='На первый слайд' width={ICON_SIZE} height={ICON_SIZE} />
          </button>
          <button onClick={handlePrevSlideClick} className={styles.button}>
            <Image src='/arrow.svg' alt='На предыдущий слайд' width={ICON_SIZE} height={ICON_SIZE} />
          </button>
          <span>
            {slide} из {totalSlides} слайдов
          </span>
          <button onClick={handleNextSlideClick} className={styles.button}>
            <Image src='/arrow.svg' alt='На следующий слайд' width={ICON_SIZE} height={ICON_SIZE} />
          </button>
          <button onClick={handleLastSlideClick} className={styles.button}>
            <Image src='/double-arrow.svg' alt='На последний слайд' width={ICON_SIZE} height={ICON_SIZE} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
