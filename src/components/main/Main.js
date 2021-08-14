import React from 'react'
import Header from './Header';
import Features from './Features';
import Footer from './Footer';
import { useGlobalContext } from '../../context';

export default function Main() {
    const { settingsState } = useGlobalContext();
    const { backGround } = settingsState;
    return (
        <section className="main" style={{ backgroundImage: `url(${backGround.img})`}}>
            <Header />
            <Features />
            <Footer />
        </section>
    )
}