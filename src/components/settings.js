import React, { useRef, useState } from 'react';
import { useGlobalContext } from '../context';
import ResetDefaultSettings from './ResetDefaultSettings';
import FetchedImages from './FetchedImages';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY
});

export default function Settings() {
    
    const { isSettingsOpen, closeSettings, settingsState, toggleDarkMode, changeTimeFormat, disableQuote, ChangeQuoteTheme, ChangeBackground, ResetToDefault} = useGlobalContext();
    const { isDarkModeOff, timeFormat, isQuoteDisable, quoteTheme} = settingsState;

    //Fetch unsplash Backgrounds
    const [backgrounds, setBackgrounds] = useState([]);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBackgrounds = async (currentPage, query = refContainer.current.value) => {
        //show Loading
        setLoading(true);

        unsplash.search.getPhotos({
            query: query,
            page: currentPage,
            perPage: 28,
            orientation: 'landscape',
        }).then(data => {
            //Remove Laoding
            setLoading(false);
            //if there is no images found 
            if(data.response.total === 0) {
                setModal(true);
            } else {
                const newBackgrounds = data.response.results;
                currentPage === 1 ? setBackgrounds(newBackgrounds) : setBackgrounds([...backgrounds].concat(newBackgrounds));
            }
        })
    };

    //Unsplah form handler
    const refContainer = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        //if Modal is on remove modal
        if(modal){
            setModal(false);
        }
        //reset background to empty array
        if (backgrounds) {
            setBackgrounds([]);
        }

        fetchBackgrounds(1, refContainer.current.value);
    };

    //handle closing modal
    const closeModal = () => {
        setBackgrounds([]);
        closeSettings();
    };

    console.log("timeFormat", timeFormat)
    return (
        <>
            {
                isSettingsOpen &&
                <section className={isDarkModeOff ? "settings light-mode" : "settings"}>
                    <button className="close__modal" onClick={closeModal}>close me</button>
                    <h2>Settings</h2>     
                    <article className={backgrounds.length > 0 || modal || loading? "settings__main extra_padding" : "settings__main"}>
                        {/* Dark Mode*/}
                        <div className="settings__main__field">
                            <p className="settings__label">Mode</p>
                            <div className="settings__action__container">
                                <span>dark</span>
                                <div className="toggleSwitch">
                                    <label className={isDarkModeOff ? ("switch on") : ("switch off")}>
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
                                    <label className={ isQuoteDisable ? ("switch on") : ("switch off")}>
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
                                <form onSubmit={handleSubmit}>
                                    <input type="text" placeholder="search" ref={refContainer}/>
                                </form>
                            </div>
                        </div>
                        <div className="background-wrapper">
                            {backgrounds.length > 0 && (
                                <FetchedImages
                                    backgrounds={backgrounds}
                                    fetchBackgrounds={fetchBackgrounds}
                                    ChangeBackground={ChangeBackground}
                                    loading={loading}
                                />
                            )}
                            {modal && (
                                <p>No results found!</p>
                            )}
                        </div>
                        {loading && (
                            <div className="loading-wrapper">
                                <p>Loading ...</p>
                            </div>
                        )}
                    </article>
                    <ResetDefaultSettings settingsState={settingsState} ResetToDefault={ResetToDefault} />
                </section>
            }
        </>
    )
};