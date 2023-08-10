import * as React from 'react';
import './PromptPopup.css'
import { ICellPrompt, ICellPromptAction, ICellPromptActionType, ICellPromptOption } from '../../../../../../types/cell';

interface IPromptPopupProps {
  prompt: ICellPrompt,
  close: () => void
}

/**
*
* @returns {JSX.Element | null}
*/
export default function PromptPopup(props: IPromptPopupProps): JSX.Element | null {

  const [selected, setSelected] = React.useState<number>(0);

  React.useEffect(function setPointerListenerToClosePrompt() {
    const listener = (event: PointerEvent) => {
      const clicked = document.elementsFromPoint(event.clientX, event.clientY);
      let shouldClose = true;
      clicked.forEach(element => {
        if (!shouldClose) return;
        if (element.classList.contains('prompt-popup-wrapper')) shouldClose = false;
      });
      if (shouldClose) {
        props.close();
      }
    }
    window.addEventListener('pointerdown', listener);
    return (() => {
      window.removeEventListener('pointerdown', listener);
    });
  }, [props.close]);

  React.useEffect(function setKeyboardListenerToControlSelection() {
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'a' || event.key === 'ArrowLeft') {
        event.preventDefault();
        setSelected(s => Math.max(0, s - 1));
      }
      if (event.key === 'd' || event.key === 'ArrowRight') {
        event.preventDefault();
        setSelected(s => Math.min(props.prompt.options.length - 1, s + 1));
      }
      if (event.key === ' ') {
        event.preventDefault();
        handleClickOption(props.prompt.options[selected].action);
      }
    }
    window.addEventListener('keydown', listener);
    return (() => {
      window.removeEventListener('keydown', listener);
    })
  }, [props.prompt, props.close, selected]);

  const handleClickOption = (action: ICellPromptAction) => {
    switch (action.type) {
      case ICellPromptActionType.CANCEL:
        props.close();
        break;
      case ICellPromptActionType.LINK:
        if (action.extra != null) window.open(action.extra);
        props.close();
        break;
    }
  }

  return (
    <div className='prompt-popup-wrapper'>
      <span className="prompt-text">{props.prompt.text}</span>
      <div className='prompt-options-wrapper'>
        {props.prompt.options.map(
          (option, index) =>
          <span className={`prompt-option ${index === selected ? 'selected': 'unselected'}`} key={`prompt-popup-${option.text}`} onClick={() => handleClickOption(option.action)}>{option.text}</span>
        )}
      </div>
    </div>
  );
}