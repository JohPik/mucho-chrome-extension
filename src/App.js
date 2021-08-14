import React from 'react';
import './App.css';
import Settings from './components/settings/Settings';
import Main from './components/main/Main';
import FadeIn from './components/FadeIn';

function App() {
  return (
    <FadeIn>
        <Settings />
        <Main/>
    </FadeIn>
  );
}

export default App;