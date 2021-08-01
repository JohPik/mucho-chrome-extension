import React from 'react'
import Header from './Header';
import Features from './Features';
import Footer from './Footer';


import { useGlobalContext } from '../context';

export default function Main() {
    const { settingsState } = useGlobalContext();
    const { backGround } = settingsState;
    let img = backGround.urls.regular;

    return (
        <section className="main" style={{ backgroundImage: `url(${img})`}}>
            <Header />
            <Features />
            <Footer />
        </section>
    )
}
