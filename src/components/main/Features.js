import React, {useState} from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import MultiPurposeModal from './MultiPurposeModal';
import { useSettingsContext } from '../../contextSettings';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;


    const [isModal, setIsModal] = useState(false)
    
    const [tabIdx, setTabIdx] = useState(0);

    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
        {/**** Add New Modal ****/}
            { isModal && <MultiPurposeModal setIsModal={setIsModal}/>}
        {/**** Search Bar ****/}
            <Search />
        {/**** Bookmarks ****/}
            <Bookmarks modal={setIsModal} tabIdx={tabIdx} setTabIdx={setTabIdx}/>
        </section>
    )
}