import React, { useRef, useState } from 'react';
import { DefaultProps } from 'types';
import { c } from '~/utils/classNames';
import './ContentTextarea.scss';

export interface ContentTextareaProps extends DefaultProps {
  value: string;
  placeholder: string;
  label?: string;
  onChange: (value: string) => void;
}

const ContentTextarea: React.FC<ContentTextareaProps> = ({ className, style, value, placeholder, label, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [defaultValue] = useState(value);

  const handleInput: React.FormEventHandler<HTMLDivElement> = (e) => {
    const newValue = e.currentTarget.innerText;
    onChange(newValue);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' && e.metaKey) {
      e.preventDefault();
      setTimeout(() => ref.current?.blur());
    }
  };

  return (
    <div className={c('content-textarea', className)}>
      {label && <div className='content-textarea__label'>{label}</div>}

      <div
        className={c('content-textarea__input')}
        style={style}
        contentEditable
        placeholder={placeholder}
        ref={ref}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: defaultValue }}
      />
    </div>
  );
};

export default ContentTextarea;
