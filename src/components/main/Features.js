import React, {useState} from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import MultiPurposeModal from './MultiPurposeModal';
import { useSettingsContext } from '../../contextSettings';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;


    const [isModal, setIsModal] = useState(false);
    const [useCase, setUseCase] = useState(null);
    const [tabIdx, setTabIdx] = useState(0);

    const handleModal = currentCase => {
        // const useCases = ["createTab", "editTab", "createShortcut", "editShortcut"]
        setUseCase(currentCase);
        setIsModal(true);
    };
    
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
        {/**** Add New Modal ****/}
            { isModal && <MultiPurposeModal setIsModal={setIsModal} useCase={useCase} tabIdx={tabIdx}/>}
        {/**** Search Bar ****/}
            <Search />
        {/**** Bookmarks ****/}
            <Bookmarks modal={handleModal} tabIdx={tabIdx} setTabIdx={setTabIdx}/>
        </section>
    )
}