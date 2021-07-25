import React from 'react';
import { useGlobalContext } from '../context';
import { createApi } from 'unsplash-js';
import BackGroundImage from './BackGroundImage';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});


function Settings() {
    const { isSettingsOpen, closeSettings, settingsState, toggleDarkMode, changeTimeFormat, disableQuote, ChangeQuoteTheme} = useGlobalContext();
    const { isDarkModeOff, timeFormat, isQuoteDisable, quoteTheme} = settingsState;

    return (
        <>
            {
                isSettingsOpen &&
                <section className={isDarkModeOff ? "settings light-mode" : "settings"}>
                    <h2>Settings</h2>
                    <button onClick={closeSettings}>close me</button>

                    <article className="settings__main">
                        {/* Dark Mode*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Mode</p>
                            <div className="settings__action__container">
                                <span>dark</span>
                                <div className="toggleSwitch">
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={isDarkModeOff} onChange={toggleDarkMode}/>
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <span>light</span>
                            </div>                            
                        </div>
                        {/* TIME FORMAT*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Time Format</p>
                            <div className="settings__action__container">
                                <select name="timeFormat" id="timeFormat" value={timeFormat} onChange={(e) => changeTimeFormat(e.target.value)}>
                                    <option value="24">24 hours (default)</option>
                                    <option value="12">12 hours</option>
                                </select>
                            </div>
                        </div>
                        {/* Disable quote*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Disable Quote</p>
                            <div className="settings__action__container">
                                <span>off</span>
                                <div className="toggleSwitch">
                                    <label className="switch">
                                        <input type="checkbox" defaultChecked={isQuoteDisable} onChange={disableQuote}/>
                                        <span className="slider"></span>
                                    </label>
                                </div>
                                <span>on</span>
                            </div>
                        </div>
                        {/* Quote Theme*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Quote Theme</p>
                            <div className="settings__action__container">
                                <select name="quoteTheme" id="quoteTheme" 
                                    disabled={isQuoteDisable ? true : null}
                                    value={quoteTheme} 
                                    onChange={(e) => ChangeQuoteTheme(e.target.value)}>
                                    <option value="all">All</option>
                                    <option value="business">business</option>
                                    <option value="education">education</option>
                                    <option value="faith">faith</option>
                                    <option value="famous-quotes">famous-quotes</option>
                                    <option value="friendship">friendship</option>
                                    <option value="future">future</option>
                                    <option value="happiness">happiness</option>
                                    <option value="history">history</option>
                                    <option value="inspirational">inspirational</option>
                                    <option value="life">life</option>
                                    <option value="literature">literature</option>
                                    <option value="love">love</option>
                                    <option value="nature">nature</option>
                                    <option value="politics">politics</option>
                                    <option value="proverb">proverb</option>
                                    <option value="religion">religion</option>
                                    <option value="science">science</option>
                                    <option value="success">success</option>
                                    <option value="technology">technology</option>
                                    <option value="wisdom">wisdom</option>
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