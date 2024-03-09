import React, { useEffect, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { executeCode } from '@/app/utils/api';
import styles from './styles.module.css';

const DEFAULT_CONSOLE_STATE = ['Нажмите "Запустить", чтобы выполнить код'];

interface CodePlaygroundProps {
  defaultCode: string;
}

const CodePlayground = ({ defaultCode }: CodePlaygroundProps) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState(DEFAULT_CONSOLE_STATE);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCode(defaultCode);
    setOutput(DEFAULT_CONSOLE_STATE);
  }, [defaultCode]);

  const handleClearButtonClick = () => {
    setOutput(DEFAULT_CONSOLE_STATE);
  };

  const handleRunButtonClick = async () => {
    if (!code) {
      return;
    }
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(code);
      console.log(result.output.split('\n'));
      setOutput(result.output.split('\n'));
      setIsError(Boolean(result.stderr));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value?: string) => {
    setCode(value ?? '');
  };

  const handleEditorDidMount: OnMount = editor => {
    editor.updateOptions({
      fontSize: 18,
      insertSpaces: true,
      minimap: {
        enabled: false,
      },
      renderLineHighlightOnlyWhenFocus: true,
      scrollBeyondLastColumn: 2,
      scrollBeyondLastLine: false,
    });
  };

  return (
    <>
      <div className={styles.header}>JavaScript demo</div>
      <Editor
        className={styles.editor}
        defaultLanguage='javascript'
        height='320px'
        onMount={handleEditorDidMount}
        value={code}
        onChange={handleChange}
      />
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button className={styles.button} disabled={isLoading} onClick={handleRunButtonClick}>
            Запустить
          </button>
          <button className={styles.button} disabled={isLoading} onClick={handleClearButtonClick}>
            Сбросить
          </button>
        </div>
        <div className={styles.output}>
          {output.map((line, i) => (
            <div className={styles.line} key={i}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CodePlayground;
