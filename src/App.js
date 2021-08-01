// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Settings from './components/Settings';
import Main from './components/Main';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

function App() {
  return (
    <>
    <FadeIn>
      <Settings />
        <Main/>
        <Footer/>
      </FadeIn>
    </>
  );
}

export default App;