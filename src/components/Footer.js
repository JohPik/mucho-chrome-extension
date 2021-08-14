import React from 'react';
import { useGlobalContext } from '../context';

export default function Footer() {
    
    const { openSettings, settingsState } = useGlobalContext();
    const { backGround } = settingsState;

    let { url, photographer } = backGround;
    
    return (
        <footer>
            <button className="settings__button" onClick={openSettings}></button>
            <div className="photo_copyright">Photo by <a href={url}>{photographer}</a>
            </div>
        </footer>
    )
}
