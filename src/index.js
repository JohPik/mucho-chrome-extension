import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SettingsProvider } from './contextSettings';
import { TabsProvider } from './contextTabs';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <TabsProvider>
        <App />
      </TabsProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
