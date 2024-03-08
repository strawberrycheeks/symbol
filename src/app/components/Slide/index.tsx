import React from 'react';
import styles from './styles.module.css';
import CodePlayground from '../CodePlayground';

interface SlideProps {
  title: string;
  content: string[];
  withCode?: boolean;
  code?: string;
}

const Slide = ({ title, content, code = '', withCode = false }: SlideProps) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {content.map((item, index) => (
        <p className={styles.text} key={index}>
          {item}
        </p>
      ))}
      <CodePlayground defaultCode={code} />
    </>
  );
};

export default Slide;
