import * as React from 'react';
import './TabbedWindow.css';

export interface TabbedWindowProps {
  tabName: string,
  children: React.ReactNode
}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function TabbedWindow(props: TabbedWindowProps): JSX.Element | null {
  return (
    <div>
      {props.children}
    </div>
  );
}

export default TabbedWindow;