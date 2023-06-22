import * as React from 'react';
import './App.css';

interface AppProps {

}
/**
 * 
 * @param {} props
 * @returns {JSX.Element | null}
 */
function App(props: AppProps): JSX.Element | null {
  return (
    <div>
      <h1>Gameguy Theme Homepage</h1>
      <p>Colby's Homepage is currently undergoing renovations.</p>
      <p>Hopefully we'll see you again soon!</p>
    </div>
  );
}

export default App;