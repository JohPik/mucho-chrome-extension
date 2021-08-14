/*global chrome*/
import React, {useState, useEffect, useContext, useReducer} from 'react';
import settingsReducer from './settingsStateMgment/settingsReducer';
import { defaultState } from './settingsStateMgment/settingsState';


const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    /*** Modal - Settings State and Methods ***/
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    /*** App Settings Management ***/
    const [settingsState, dispatch] = useReducer(settingsReducer, defaultState);

    const toggleDarkMode = () => {
        dispatch({ type: 'TOGGLE_DARK_MODE'})
    };

    const changeTimeFormat = timeValue => {
        dispatch({ type: 'CHANGE_TIME_FORMAT', payload: timeValue})
    };

    const disableQuote = () => {
        dispatch({ type: "DISABLE_QUOTE"})
    };

    const ChangeQuoteTheme = theme => {
        dispatch({ type: "CHANGE_QUOTE_THEME", payload: theme})
    };

    const ChangeBackground = img => {
        dispatch({ type: "CHANGE_BACKGROUND", payload: img })
    };

    const ResetToDefault = () => {
        dispatch({ type: "RESET_TO_DEFAULT"})
    };

    //CLEAR ALL
    // useEffect(() => {
    //     chrome.storage.sync.clear();
    // }, [])

    /*** Chrome User Setting Management ***/
    //Looks for saved Settings on Chrome first time App is Rendered
    useEffect(() => {
        chrome.storage.sync.get(['MUCHO_CHROME_SETTINGS'], result => {
            const userSettings = result.MUCHO_CHROME_SETTINGS;
            // if saved Settings => saved them to state
            // else => Saved defaultState as Settings in Chrome
            userSettings ? (
                dispatch({ type: 'GET_EXISTING_CHROME_SETTINGS', payload: userSettings })
            ) : (
                chrome.storage.sync.set({ MUCHO_CHROME_SETTINGS: { ...defaultState } })
            );
        });
    }, [])

    //Saves updated settings to Chrome
    useEffect(() => {
        chrome.storage.sync.set({ MUCHO_CHROME_SETTINGS: { ...settingsState } });
    }, [settingsState])

    return (
        <AppContext.Provider value={{ 
            isSettingsOpen, 
            openSettings, 
            closeSettings, 
            settingsState, 
            toggleDarkMode,
            changeTimeFormat,
            disableQuote,
            ChangeQuoteTheme,
            ChangeBackground,
            ResetToDefault}}
            >
            {children}
        </AppContext.Provider>
    ) 
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext};

