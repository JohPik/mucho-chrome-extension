import React, {useState, useContext, useReducer} from 'react';
import settingsReducer from './settings/settingsReducer';
import { initialSettingsState } from './settings/settingsState';


const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    
    // MODAL - Settings State and Methods
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    // APP Settings
    const [settingsState, dispatch] = useReducer(settingsReducer, initialSettingsState);

    const toggleDarkMode = () => {
        dispatch({type: 'TOGGLE_DARK_MODE'})
    };

    const changeTimeFormat = (timeValue) => {
        dispatch({ type: 'CHANGE_TIME_FORMAT', payload: timeValue})
    };

    const disableQuote = () => {
        dispatch({ type: "DISABLE_QUOTE"})
    };

    const ChangeQuoteTheme = (theme) => {
        dispatch({ type: "CHANGE_QUOTE_THEME", payload: theme})
    };

    const ChangeBackground = (img) => {
        dispatch({ type: "CHANGE_BACKGROUND", payload: img })
    };

    const ResetToDefault = () => {
        dispatch({ type: "RESET_TO_DEFAULT"})
    };

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

