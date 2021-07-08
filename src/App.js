// import logo from './logo.svg';
import './App.css';
import Settings from './components/Settings';
import Quote from './components/Quote';
import Features from './components/Features';
import Times from './components/Times';
import Footer from './components/Footer';
import FadeIn from './components/FadeIn';

import { useState } from 'react';


function App() {

  const [settings, setSettings] = useState(false);
  
  return (
    <>
    <FadeIn>
      {settings && <Settings closeModal={setSettings} />}
      <div className="main">
        <Quote />
        <Features />
        <Times />
      </div>
        <Footer openModal={setSettings}/>
      </FadeIn>
    </>
  );
}

export default App;