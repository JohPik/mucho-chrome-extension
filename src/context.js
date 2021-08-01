import React, {useState, useContext, useReducer, useEffect} from 'react';
import settingsReducer from './settingsReducer';
import backgroundImage from './img/pink-fluid-min.jpg'

const AppContext = React.createContext();

const defaultBackground = {
    id: "default",
    user: { name: "Pawel Czerwinski"},
    links: { html: "https://unsplash.com/photos/ruJm3dBXCqw" },
    urls: { regular: backgroundImage}

}

const initialSettingsState = {
    isDarkModeOff: false,
    timeFormat: "24",
    isQuoteDisable: false,
    quoteTheme: "all",
    backGround: defaultBackground
};

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
    }

    const ChangeQuoteTheme = (theme) => {
        dispatch({ type: "CHANGE_QUOTE_THEME", payload: theme})
    }

    const ChangeBackground = (img) => {
        dispatch({ type: "CHANGE_BACKGROUND", payload: img })
    }

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
            ChangeBackground}}
            >
            {children}
        </AppContext.Provider>
    ) 
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext};

