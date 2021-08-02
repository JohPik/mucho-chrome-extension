import React from 'react';
import { useGlobalContext } from '../context';

export default function Footer() {
    
    const { openSettings, settingsState } = useGlobalContext();
    const { backGround } = settingsState;

    let link = backGround.links.html;
    let author = backGround.user.name;

    return (
        <footer>
            <button className="settings__button" onClick={openSettings}></button>
            <div className="photo_copyright">Photo by <a href={link}>{author}</a>
            </div>
        </footer>
    )
}
