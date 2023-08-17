import * as React from 'react';
import './TabbedWindows.css';
import TabbedWindow, { TabbedWindowProps } from './tabbedWindow/TabbedWindow';

interface TabbedWindowsProps {
  className?: string | undefined,
  children: React.ReactElement<TabbedWindowProps>[] | React.ReactElement<TabbedWindowProps>
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function TabbedWindows(props: TabbedWindowsProps): JSX.Element | null {

  const [currentTab, setCurrentTab] = React.useState<number>(0);

  const handleChangeTab = (index: number) => {
    setCurrentTab(index);
  }

  return (
    <div className={`tabbed-windows-wrapper ${props.className}`}>
      <div className='tabbed-windows-tabs'>
        {(Array.isArray(props.children)) ? props.children.map(
          (child, index) => {
            if (child.props.tabName && child.props.children) return <div className={`tabbed-windows-tab-wrapper`} key={`tabbed-windows-button-${child.props.tabName}`}><button className={`tabbed-windows-tab-button ${currentTab === index ? 'active': 'inactive'}`} name={child.props.tabName} type='button' onClick={() => handleChangeTab(index)}>{child.props.tabName}</button></div>
            else return <></>
          }
        ) : 
        <>{props.children.props.tabName && props.children.props.children && <button className={`tabbed-windows-tab-button active`} key={`tabbed-windows-button-${props.children.props.tabName}`} name={props.children.props.tabName} type='button' onClick={() => handleChangeTab(0)}>{props.children.props.tabName}</button>}</>
      }
      </div>
      <div className='tabbed-windows-body'>
        {(Array.isArray(props.children)) ? props.children[currentTab] : props.children }
      </div>
    </div>
  );
}

export default TabbedWindows;