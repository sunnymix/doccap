import { useCallback, useMemo, useRef, useState } from "react"
import BlockApi from "../api/BlockApi";

export interface EditorProps {
  blockId: string,
  initialText: string,
};

export default (props: EditorProps) => {

  // --- text:

  const saveText = (text: string) => {
    BlockApi.updateBlock(props.blockId, { text });
    return true;
  };
  
  const [text, setText] = useState<string>(props.initialText);
  const updateText = (text: string) => {
    saveText(text);
    setText(text);
  };

  // --- focus:

  const [focused, setFocused] = useState<boolean>(false);

  // --- ref:

  const editorRef = useRef<any>(null);

  // --- input:

  const handleInput = useCallback((e) => {
    let text = '';

    e.target.childNodes.forEach((node: any, i: number) => {
      text += (node.innerText || node.nodeValue || '').replace(/\n/g, '');
      if (i != e.target.childNodes.length - 1) {
        text += '\n';
      }
    });

    if (text === '') {
      editorRef.current.innerHTML = '';
      updateText(text);
    } else {
      updateText(text);
    }

  }, []);

  // --- paste:

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    document.execCommand('insertText', false, e.clipboardData.getData('text'));
  }, []);

  // --- clear:

  const clearEditor = useCallback(() => {
    setText('');
    editorRef.current.innerHTML = '';
  }, []);

  // --- focus:

  const handleFocus = useCallback((e) => setFocused(true), []);
  const handleBlur = useCallback((e) => setFocused(false), []);

  const focusEditor = useCallback(() => {
    var range = document.createRange();
    range.setStart(editorRef.current, 0);
    range.setEnd(editorRef.current, 0);
    
    var selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  // --- text2HTML:

  const text2HTML = useCallback((text: string): string => {
    return text
      .split('\n')
      .map((line: string) => {
        const HTML = line
          .replace(/&/gi, '&amp;')
          .replace(/</gi, '&lt;')
          .replace(' ', '&nbsp;');
        return `<div>${HTML || '<br />'}</div>`;
      }).join('');
  }, []);

  // --- props:

  const editorProps = useMemo(() => ({
    contentEditable: true,
    onInput: handleInput,
    onPaste: handlePaste,
    onFocus: handleFocus,
    onBlur: handleBlur,
    ref: editorRef,
    dangerouslySetInnerHTML: {
      __html: text2HTML(props.initialText)
    }
  }), [props.initialText, handleInput, handlePaste]);

  // --- export:

  return {
    editorProps,
    editorText: text,
    editorFocused: focused,
    editorRef,
    focusEditor,
    clearEditor,
  }
};
