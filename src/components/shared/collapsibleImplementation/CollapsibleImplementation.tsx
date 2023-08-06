import * as React from 'react';
import './CollapsibleImplementation.css'
import Collapsible from 'react-collapsible';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CollapsibleImplementationProps {
  triggerTitle: string,
  triggerClassName: string,
  children: React.ReactNode,
  id: string,
  collapseOnOpenOther?: boolean | undefined
}

/**
* The component used in this app that implements `react-collapsible` to create a collapsible element with some custom styling and behavior.
* @param {string} props.triggerTitle The text that should be clicked to open or close the collapsible.
* @param {React.ReactNode} props.children The child or children to display when the collapsible is opened.
* @returns {JSX.Element | null}
*/
function CollapsibleImplementation(props: CollapsibleImplementationProps): JSX.Element | null {

  const [isOpen, setOpen] = React.useState<boolean>(false);

  React.useEffect(function addListenerToCollapseEventOnMount() {
    const eventListener = () => setOpen(false);
    window.addEventListener('onrotate', eventListener)
    return (() => {
      window.removeEventListener('onrotate', eventListener);
    });
  }, []);

  React.useEffect(function addListenerToCollapseOnOpenOther() {
    const listener = (event: CustomEvent) => {
      if (event.detail !== props.triggerTitle) {
        setOpen(false);
      }
    };
    if (props.collapseOnOpenOther !== undefined && props.collapseOnOpenOther === true) {
      window.addEventListener('onopencollapsible', listener as (e: Event) => void)
    }
    return (() => {
      window.removeEventListener('onopencollapsible', listener as (e: Event) => void);
    })
  }, [ props.collapseOnOpenOther ])

  const handleOpening = () => {
    setOpen(true);
    window.dispatchEvent(new CustomEvent('onopencollapsible', { detail: props.triggerTitle }));
  }

  const handleClosing = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    const element = document.querySelector(`#${props.id}`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  function renderTrigger(): JSX.Element {
    return (
      <div id={props.id} aria-label={props.triggerTitle} className={props.triggerClassName + ' collapsible-trigger' + (isOpen ? ' collapsible-trigger-open' : '')}>
        <h3 className='collapsible-trigger-title'>{props.triggerTitle}</h3>
        <span>{ isOpen ? <ChevronUpIcon className='icon' /> : <ChevronDownIcon className='icon' /> }</span>
      </div>
    );
  }

  return (
    <Collapsible
    open={isOpen}
    onOpening={handleOpening}
    onClosing={handleClosing}
    onOpen={handleOpen}
    transitionCloseTime={1}
    transitionTime={100}
    trigger={renderTrigger()}>
      {props.children}
    </Collapsible>
  );
}

export default CollapsibleImplementation;