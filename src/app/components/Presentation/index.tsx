import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Slide from '../Slide';

const defaultContent = [
  'Текст слайда.',
  'Текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда, текст слайда',
  'Текст слайда',
];

const defaultSourceCode = `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Symbol");\n`;

const Presentation = () => {
  const [slide, setSlide] = useState();

  useEffect(() => {}, []);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <Slide title='Название слайда' content={defaultContent} code={defaultSourceCode} withCode />
      </div>
      <div className={styles.footer}>
        <p>Symbol и его применение</p>
        <p>12 из 31 слайдов</p>
      </div>
    </div>
  );
};

export default Presentation;
