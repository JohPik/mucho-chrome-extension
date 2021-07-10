// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Settings from './components/Settings';
import Quote from './components/Quote';
import Features from './components/Features';
import Times from './components/Times';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

function App() {
  return (
    <>
    <FadeIn>
      <Settings />
      <div className="main">
        <Quote />
        <Features />
        <Times />
      </div>
        <Footer/>
      </FadeIn>
    </>
  );
}

export default App;