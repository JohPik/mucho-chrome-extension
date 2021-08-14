import React from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import { useGlobalContext } from '../../context';

export default function Features() {
    
    const { settingsState } = useGlobalContext();
    const { isDarkModeOff } = settingsState;
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
            <Search />
            <Bookmarks />
        </section>
    )
}