import React, {useState} from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import MultiPurposeModal from './MultiPurposeModal';
import { useSettingsContext } from '../../contextSettings';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;

    // Manages if modal is visible
    const [isModal, setIsModal] = useState(false);
    // Manages the different Use Case of Modal, ex: Add new Bookmark
    const [useCase, setUseCase] = useState(null);
    // Manages the Currently displayed Tab
    const [tabIdx, setTabIdx] = useState(0);
    // Manages the Clicked Tab - only required in Edit Tab
    const [clikedTab, setClikedTab] = useState(null);

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
    
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
        {/**** Add New / Edit Modal for Bookmarks and Tabs****/}
            { isModal && <MultiPurposeModal setIsModal={setIsModal} useCase={useCase} tabIdx={tabIdx} clikedTab={clikedTab}/>}
        {/**** Search Bar ****/}
            <Search />
        {/**** Bookmarks ****/}
            <Bookmarks modal={handleModal} tabIdx={tabIdx} setTabIdx={setTabIdx}/>
        </section>
    )
}