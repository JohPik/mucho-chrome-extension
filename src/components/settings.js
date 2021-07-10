import React from 'react';
import { useGlobalContext } from '../context';

export default function Settings() {

    const { isSettingsOpen, closeSettings } = useGlobalContext();

    return (
        <>
            {
                isSettingsOpen &&
                <div className="settings active_modal">
                <h2>SETTINGS</h2>
                <button onClick={closeSettings}>close me</button>
                </div>

            }
        </>
    )
};
