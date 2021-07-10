import React from 'react';
import { useGlobalContext } from '../context';

export default function Footer() {
    
    const { openSettings } = useGlobalContext();
    
    return (
        <footer>
            <button className="settings__button" onClick={openSettings}></button>
            <div className="photo_copyright">Photo by Pawel Czerwinski</div>
        </footer>
    )
}
