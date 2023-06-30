import * as React from 'react';
import './CollapsibleImplementation.css'
import Collapsible from 'react-collapsible';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CollapsibleImplementationProps {
  triggerTitle: string,
  children: React.ReactNode,
  scrollToElementId: string
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

  const handleOpening = () => {
    setOpen(true);
    window.dispatchEvent(new Event('onopenmoreinfo'));
  }

  const handleClosing = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    console.log('Scroll to element of id: ', props.scrollToElementId);
    const element = document.querySelector(`#${props.scrollToElementId}`);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }

  function renderTrigger(): JSX.Element {
    return (
      <div aria-label='More Info' className={'collapsible-trigger ' + (isOpen ? 'collapsible-trigger-open' : '')}>
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
    transitionTime={100}
    trigger={renderTrigger()}>
      {props.children}
    </Collapsible>
  );
}

export default CollapsibleImplementation;