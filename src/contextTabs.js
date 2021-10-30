/*global chrome*/
import React, { useContext, useReducer } from 'react';
import tabsReducer from './GlobalStateMgmt/tabs/tabsReducer';
import tabs from './utilities'; 

const TabsContext = React.createContext();

const TabsProvider = ({ children }) => {

    const [tabsState, dispatch] = useReducer(tabsReducer, tabs);

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

    return (
        <TabsContext.Provider value={{ tabsState, addTab, renameTab, deleteTab, deleteBookmark, addBookmark }}>
            {children}
        </TabsContext.Provider>
    )

};

const useTabsContext = () => useContext(TabsContext);

export { TabsContext, TabsProvider, useTabsContext };