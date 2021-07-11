import React, {useState, useEffect} from 'react';
import { useGlobalContext } from '../context';
import { createApi } from 'unsplash-js';
import BackGroundImage from './BackGroundImage';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});


function Settings() {

    const { isSettingsOpen, closeSettings } = useGlobalContext();

    const [settings, setSettings] = useState({
        dark_mode: true,
        timeFormat24: true,
        quoteDisable: false,
        quoteTheme: "",
        quoteAuthor: [],
        backGround: ""
    })

    const getQuote = () => {
        unsplash.search.getPhotos({
            query: 'cat',
            page: 1,
            perPage: 10,
            orientation: 'landscape',
        })
        .then(data => {
            console.log(data.response.results);
        })
    };


    const [lightMode, isLightMode] = useState(false);
    const handleChange = e => {
        isLightMode(!lightMode)
    }

    console.log(lightMode)
    return (
        <>
            {
                isSettingsOpen &&
                <section className="settings active_modal">
                    <h2>Settings</h2>
                    <button onClick={closeSettings}>close me</button>

                    <article className="settings__main">
                        {/* Dark Mode*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Mode</p>
                            <div className="settings__action__container">
                                <span>dark</span>
                                <div className="toggleSwitch">
                                    <label class="switch">
                                        <input type="checkbox"/>
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <span>light</span>
                            </div>                            
                        </div>
                        {/* TIME FORMAT*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Time Format</p>
                            <div className="settings__action__container">
                                <select name="timeFormat" id="timeFormat">
                                    <option value="24">24 hours (default)</option>
                                    <option value="saab">12 hours</option>
                                </select>
                            </div>
                        </div>
                        {/* Disable quote*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Disable Quote</p>
                            <div className="settings__action__container">
                                <span>off</span>
                                <div className="toggleSwitch">
                                    <label class="switch">
                                        <input type="checkbox" />
                                        <span class="slider"></span>
                                    </label>
                                </div>
                                <span>on</span>
                            </div>
                        </div>
                        {/* Quote Theme*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Quote Theme</p>
                            <div className="settings__action__container">
                                <select name="quoteTheme" id="quoteTheme">
                                    <option value="all">All</option>
                                </select>
                            </div>
                        </div>
                        {/* Background Picture */}
                        <div className="settings__main__field">
                            <p className="settings__label">Background Picture</p>
                            <div className="settings__action__container">
                                <input type="text" placeholder="search"/>
                            </div>
                        </div>
                        <BackGroundImage />
                    </article>
                </section>

            }
        </>
    )
};

export default Settings


//     < div className = "wrg-toggle" >
//     <div className="wrg-toggle-container">
//         <div className="wrg-toggle-check">
//             <span>🌜</span>
//         </div>
//         <div className="wrg-toggle-uncheck">
//             <span>🌞</span>
//         </div>
//     </div>
//     <div className="wrg-toggle-circle"></div>
//     <input className="wrg-toggle-input" type="checkbox" aria-label="Toggle Button" />
// </div >