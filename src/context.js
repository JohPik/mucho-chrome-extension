import React, {useState, useContext} from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    
    const [isSettingsOpen, setSettingsOpen] = useState(false);

    const openSettings = () => {
        setSettingsOpen(true);
    };

    const closeSettings = () => {
        setSettingsOpen(false);
    };

    return (
        <AppContext.Provider value={{ isSettingsOpen, openSettings, closeSettings }}>
            {children}
        </AppContext.Provider>
    ) 
};

const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext};

