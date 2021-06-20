// import logo from './logo.svg';
import './App.css';
import Quote from './components/Quote';
import Features from './components/Features';
import Times from './components/Times'

import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="main">
        <Quote />
        <Features />
        <Times />
      </div>
      <Footer />
    </>
  );
}

export default App;
