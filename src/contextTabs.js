/*global chrome*/
import React, { useContext, useReducer } from 'react';
import tabsReducer from './GlobalStateMgmt/tabs/tabsReducer';
import tabs from './utilities'; 

const TabsContext = React.createContext();

const TabsProvider = ({ children }) => {

    const [tabsState, dispatch] = useReducer(tabsReducer, tabs);

    return (
        <TabsContext.Provider value={{ tabsState }}>
            {children}
        </TabsContext.Provider>
    )

};

const useTabsContext = () => useContext(TabsContext);

export { TabsContext, TabsProvider, useTabsContext };