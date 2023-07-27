import * as React from 'react';
import Modal from 'react-modal';
import { createRoot } from 'react-dom/client';

import './src/styles/reset.css';
import './src/styles/colors.css';
import './src/styles/images.css';
import './src/styles/fonts.css';
import './src/styles/vars.css';
import './src/styles/shared.css';

import './index.css';

import './src/i18n/i18n';

import App from './src/components/app/App';
import { BrowserRouter } from 'react-router-dom';

Modal.setAppElement('#react-root');
Modal.defaultStyles.content = {};
Modal.defaultStyles.overlay = {
  ...Modal.defaultStyles.overlay,
  backgroundColor: 'rgba(0, 0, 0, 0.4)'
};

const container = document.getElementById('react-root');
if (container != null) {
  const root = createRoot(container);
  root.render(<BrowserRouter><App /></BrowserRouter>);
}