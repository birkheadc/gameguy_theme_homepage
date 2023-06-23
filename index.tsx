import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './src/styles/reset.css';
import './src/styles/colors.css';
import './src/styles/images.css';
import './src/styles/fonts.css';
import './src/styles/vars.css';

import './index.css';

import App from './src/components/app/App';

const container = document.getElementById('react-root');
if (container != null) {
  const root = createRoot(container);
  root.render(<App />);
}