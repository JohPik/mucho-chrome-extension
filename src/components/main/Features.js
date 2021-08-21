import React from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import { useSettingsContext } from '../../context';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
            <Search />
            <Bookmarks />
        </section>
    )
}