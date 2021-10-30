/*global chrome*/
import React, { useContext, useReducer, useEffect } from 'react';
import tabsReducer from './GlobalStateMgmt/tabs/tabsReducer';

const TabsContext = React.createContext();

const TabsProvider = ({ children }) => {

    const [tabsState, dispatch] = useReducer(tabsReducer, []);

    const addTab = tab => {
        dispatch({ type: "ADD_TAB", payload: tab});
    };

    const renameTab = tab => {
        dispatch({ type: "RENAME_TAB", payload: tab})
    }

    const deleteTab = tab => {
        dispatch({ type: "DELETE_TAB", payload: tab})
    }

    const addBookmark = bookmark => {
        dispatch({ type: "ADD_SHORTCUT", payload: bookmark});
    };

    const deleteBookmark = (tabIdx, shortcutIdx) => {
        dispatch({ type: "DELETE_SHORTCUT", payload: {tabIdx, shortcutIdx} });
    };

    //Looks for saved Tabs on Chrome first time App is Rendered
    useEffect(() => {
        chrome.storage.sync.get(['MUCHO_CHROME_TABS'], result => {
            const userTabs = result.MUCHO_CHROME_TABS;
            // if saved Tabs => saved them to state
            // else => Saved tabsState as Tabs in Chrome
            userTabs ? (
                dispatch({ type: 'GET_EXISTING_CHROME_TABS', payload: userTabs })
            ) : (
                chrome.storage.sync.set({ MUCHO_CHROME_TABS: [...tabsState] })
            );
        });
    }, [])

    //Saves updated Tabs to Chrome
    useEffect(() => {
        chrome.storage.sync.set({ MUCHO_CHROME_TABS: [...tabsState] });
    }, [tabsState])

    return (
        <TabsContext.Provider value={{ tabsState, addTab, renameTab, deleteTab, deleteBookmark, addBookmark }}>
            {children}
        </TabsContext.Provider>
    )

};

const useTabsContext = () => useContext(TabsContext);

export { TabsContext, TabsProvider, useTabsContext };