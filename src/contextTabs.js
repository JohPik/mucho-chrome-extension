/*global chrome*/
import React, { useContext, useReducer } from 'react';
import tabsReducer from './GlobalStateMgmt/tabs/tabsReducer';
import tabs from './utilities'; 

const TabsContext = React.createContext();

const TabsProvider = ({ children }) => {

    const [tabsState, dispatch] = useReducer(tabsReducer, tabs);

    const deleteBookmark = (tabIdx, shortcutIdx) => {
        dispatch({ type: "DELETE_SHORTCUT", payload: {tabIdx, shortcutIdx} })
    };

    return (
        <TabsContext.Provider value={{ tabsState, deleteBookmark }}>
            {children}
        </TabsContext.Provider>
    )

};

const useTabsContext = () => useContext(TabsContext);

export { TabsContext, TabsProvider, useTabsContext };