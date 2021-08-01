// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Settings from './components/Settings';
import Main from './components/Main';
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