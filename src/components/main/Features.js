import React, {useState, useEffect, useRef} from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import MultiPurposeModal from './MultiPurposeModal';
import { useSettingsContext } from '../../contextSettings';

import { useTabsContext } from '../../contextTabs';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;

    // Manages if modal is visible
    const [isModal, setIsModal] = useState(false);
    // Manages the different Use Case of Modal, ex: Add new Bookmark
    const [useCase, setUseCase] = useState(null);
    // Stores the Index of current displayed Tab
    const [tabIdx, setTabIdx] = useState(0);
    // Stores the Index of cliked Tab - only required in Edit Tab
    const [clikedTab, setClikedTab] = useState(null);

    // Retrieve all Tabs and deleteBookmark helper function form Context
    const { tabsState, deleteBookmark } = useTabsContext();
    // Stores the Data of current displayed Tab
    const [currentTab, setCurrentTab] = useState(null);

    /**
     * Modal Management
     * Programatically generates the different modals
     * to use the Rename Tab modal
     * an extra parameter indexOfCurrentClikedTab is required
     */
    const handleModal = (currentCase, indexOfCurrentClikedTab) => {
        setClikedTab(indexOfCurrentClikedTab);
        setUseCase(currentCase);
        setIsModal(true);
    };

    /*
     * Handles Which Tab is Currently rendered in 3 specific use Cases
     * 1 - Make a copy of Tabs State in a Use Ref on first Render
     * 2 - When Tabs State is updated, update current Tab in View if:
     *      I -  Deleting a Tab 
     *      II -  New Tab is Created
     *      III -  Edit an Exisitng Tag which is Current Tab in View 
     */
    const [specialCase, setSpecialCase] = useState(false);
    const stateRef = useRef();
    
    useEffect( () => {
        stateRef.current = tabsState;
    }, [])

    const specialCaseHelper = () => {
        // helper variable storing the index of the new Tab to be rendered
        // by default always equal to the currently rendered tab
        let tabIndex = tabIdx;
        
        // I - Deleting a Tab 
        if (stateRef.current.length > tabsState.length ) { 
            // 1 - Tab to delete is Currently Tab rendered
            if (clikedTab === 0 ) { tabIndex = 0 } 
            // 2 - Tab to delete is not Currently rendered and is the first or it last element of Tabs State and is being Rendered
            else if (clikedTab === tabIdx || tabIdx === tabsState.length) { tabIndex = tabIdx - 1; } 
            // 3 - Tab to delete is not Currently rendered and not first or last
            else if (clikedTab !== tabIdx ) { tabIndex = tabIdx; } 
        }
        // II - New Tab created
        else if (clikedTab === undefined) { 
            tabIndex = tabsState.length - 1; 
        } 
        // III - Edit an Exisitng Tag which is Current Tab in View
        else if (clikedTab !== tabIdx) { 
            tabIndex = clikedTab; 
        }

        // Update Tab to be rendered
        setCurrentTab(tabsState[tabIndex]);
        setTabIdx(tabIndex); 
        // Update useREf
        stateRef.current = tabsState;
    }

    useEffect(() => {
        if(specialCase){
            console.log("specialCase has changed to " + specialCase)
            specialCaseHelper();
            setSpecialCase(false);
        }        
    }, [specialCase])
    
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
        {/**** Add New / Edit Modal for Bookmarks and Tabs****/}
            { isModal && <MultiPurposeModal setIsModal={setIsModal} useCase={useCase} tabIdx={tabIdx} clikedTab={clikedTab} setSpecialCase={setSpecialCase}/>}
        {/**** Search Bar ****/}
            <Search />
        {/**** Bookmarks ****/}
            <Bookmarks modal={handleModal} tabIdx={tabIdx} setTabIdx={setTabIdx} tabsState={tabsState} deleteBookmark={deleteBookmark} currentTab={currentTab} setCurrentTab={setCurrentTab} isDarkModeOff={isDarkModeOff}/>
        </section>
    )
}