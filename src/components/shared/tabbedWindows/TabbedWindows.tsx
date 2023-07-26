import * as React from 'react';
import './TabbedWindows.css';
import TabbedWindow, { TabbedWindowProps } from './tabbedWindow/TabbedWindow';

interface TabbedWindowsProps {
  children: React.ReactElement<TabbedWindowProps>[]
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function TabbedWindows(props: TabbedWindowsProps): JSX.Element | null {

  const [currentTab, setCurrentTab] = React.useState<string>(props.children[0].props.tabName);

  const handleChangeTab = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(event.currentTarget.name);
  }

  return (
    <div className='tabbed-windows-wrapper'>
      <div className='tabbed-windows-tabs'>
        {props.children.map(
          child =>
          <>{child.props.tabName && child.props.children && <button key={`tabbed-windows-button-${child.props.tabName}`} name={child.props.tabName} type='button' onClick={handleChangeTab}>{child.props.tabName}</button>}</>
        )}
      </div>
      <div className='tabbed-windows-body'>
        {props.children.find(c => c.props.tabName === currentTab)?.props.children}
      </div>
    </div>
  );
}

export default TabbedWindows;