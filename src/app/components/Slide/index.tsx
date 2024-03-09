import React from 'react';
import CodePlayground from '@/app/components/CodePlayground';
import styles from './styles.module.css';

export interface SlideProps {
  title: string;
  content: string[];
  withCode?: boolean;
  code?: string;
  type?: 'title' | 'default';
}

const Slide = ({ title, content, code = '', withCode = false, type = 'default' }: SlideProps) => {
  return (
    <>
      <h1 className={styles.title} data-type={`${type}`}>
        {title}
      </h1>
      {content.map((item, index) => (
        <p className={styles.text} data-type={`${type}`} key={index}>
          {item}
        </p>
      ))}
      {withCode && <CodePlayground defaultCode={code} />}
    </>
  );
};

export default Slide;
