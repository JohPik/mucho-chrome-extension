/*global chrome*/
import React, { useContext, useReducer, useEffect } from 'react';
import tabsReducer from './GlobalStateMgmt/tabs/tabsReducer';
import cloneDeep from 'lodash/cloneDeep';

import base64ToBlob from './faviconUtilities/base64ToBlob';


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

    //Looks for saved Tabs on Chrome the first time App is Rendered
    useEffect(() => {
        //Check the validity of the Blobs URL
        const blobChecker = async (img) => {
                const {faviconURL, faviconBase64} = img;
                //if faviconURL is valid return Favicon URL
                //other wise create a new one thanks to base64ToBlob
                const newFavicon = await fetch(faviconURL).then(res => faviconURL).catch(async error => {
                    const newFaviconURL = await base64ToBlob(faviconBase64);
                    return newFaviconURL.slice(24);
                });

                return newFavicon
        }

        //Check Favicons by calling BlobChecker
        const checkedFavicons = async (userTabs) => {
            const userTabsDeepCopy = cloneDeep(userTabs);
            
            //Loop over the Tabs and look for Links to be checked
            for await (const tab of userTabsDeepCopy) {
                if(tab.links.length > 0) {
                    for await (const link of tab.links){
                        link.img.faviconURL = await blobChecker(link.img);
                    }
                }
            }
            return userTabsDeepCopy
        }
        
        //Looks for User Tabs stored inside chrome    
        const getChromeTabs = async () => {            
            await chrome.storage.local.get(['MUCHO_CHROME_TABS'], async result => {
                // const userTabs = JSON.parse(result.MUCHO_CHROME_TABS);
                const userTabs = result.MUCHO_CHROME_TABS;
                
                if(userTabs) {
                    Promise.resolve(checkedFavicons(userTabs).then( checkedTabs => {
                        return dispatch({ type: 'GET_EXISTING_CHROME_TABS', payload: checkedTabs })
                    }));
                } 
                return
            });   
        }
        
        getChromeTabs();
    }, [])

    // Saves updated Tabs to Chrome
    useEffect(() => {
        chrome.storage.local.set({ MUCHO_CHROME_TABS: [...tabsState]});
    }, [tabsState])


    return (
        <TabsContext.Provider value={{ tabsState, addTab, renameTab, deleteTab, deleteBookmark, addBookmark }}>
            {children}
        </TabsContext.Provider>
    )

};

const useTabsContext = () => useContext(TabsContext);

export { TabsContext, TabsProvider, useTabsContext };