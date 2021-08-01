import React from 'react'
import Quote from './Quote';
import Features from './Features';
import Times from './Times';
import { useGlobalContext } from '../context';

export default function Main() {
    const { settingsState } = useGlobalContext();
    const { backGround } = settingsState;
    let img = backGround.urls.regular;

    return (
        <div className="main" style={{ backgroundImage: `url(${img})`}}>
            <Quote />
            <Features />
            <Times />
        </div>
    )
}
