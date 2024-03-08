import React, { useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import { executeCode } from '@/app/utils/api';
import styles from './styles.module.css';

type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface CodePlaygroundProps {
  defaultCode: string;
}

const CodePlayground = ({ defaultCode }: CodePlaygroundProps) => {
  const editorRef = useRef<IStandaloneCodeEditor>();
  const [value, setValue] = useState(defaultCode);

  const [output, setOutput] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleButtonClick = async () => {
    const sourceCode = value;
    if (!sourceCode) {
      return;
    }
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(sourceCode);
      setOutput(result.output.split('\n'));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value?: string) => {
    console.log(value);
    setValue(value ?? '');
  };

  const handleEditorDidMount: OnMount = editor => {
    editorRef.current = editor;
    editor.updateOptions({
      fontFamily: "Menlo, Monaco, 'Courier New', monospace",
      fontSize: 15,
      scrollBeyondLastLine: false,
      scrollBeyondLastColumn: 2,
      renderLineHighlightOnlyWhenFocus: true,
    });
  };

  return (
    <>
      <div className={styles.header}>JavaScript demo: Array.push()</div>
      <Editor
        className={styles.editor}
        defaultLanguage='javascript'
        height='240px'
        onMount={handleEditorDidMount}
        value={value}
        onChange={handleChange}
      />
      <div className={styles.controls}>
        <div className={styles.buttons}>
          <button className={styles.button} disabled={isLoading} onClick={handleButtonClick}>
            Запустить
          </button>
          <button className={styles.button} disabled={isLoading} onClick={handleButtonClick}>
            Сбросить
          </button>
        </div>
        <div className={styles.output}>
          {output ? output.map((line, i) => <p key={i}>{line}</p>) : 'Нажмите "Запустить", чтобы выполнить код'}
        </div>
      </div>
    </>
  );
};

export default CodePlayground;
