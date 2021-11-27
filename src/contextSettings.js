/*global chrome*/
import React, {useState, useEffect, useContext, useReducer} from 'react';
import settingsReducer from './GlobalStateMgmt/settings/settingsReducer';
import { defaultState } from './GlobalStateMgmt/settings/settingsState';


const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {

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
    
    /*** Chrome User Setting Management ***/
    //Looks for saved Settings on Chrome first time App is Rendered
    useEffect(() => {
        chrome.storage.local.get(['MUCHO_CHROME_SETTINGS'], result => {
            const userSettings = result.MUCHO_CHROME_SETTINGS;
            // if saved Settings => saved them to state
            // else => Saved defaultState as Settings in Chrome
            userSettings ? (
                dispatch({ type: 'GET_EXISTING_CHROME_SETTINGS', payload: userSettings })
            ) : (
                chrome.storage.local.set({ MUCHO_CHROME_SETTINGS: { ...defaultState } })
            );
        });
    }, [])

    //Saves updated settings to Chrome
    useEffect(() => {
        chrome.storage.local.set({ MUCHO_CHROME_SETTINGS: { ...settingsState } });
    }, [settingsState])

    return (
        <SettingsContext.Provider value={{
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
        </SettingsContext.Provider>
    ) 
};

const useSettingsContext = () => useContext(SettingsContext);

export { SettingsContext, SettingsProvider, useSettingsContext};

