import React, {useEffect} from 'react';
import { useGlobalContext } from '../context';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});


function Settings() {

    const { isSettingsOpen, closeSettings } = useGlobalContext();

    const getQuote = () => {
        unsplash.search.getPhotos({
            query: 'cat',
            page: 1,
            perPage: 10,
            orientation: 'landscape',
        })
        .then(data => {
            console.log(data);
        })
    };

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

export default Settings
