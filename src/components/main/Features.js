import React, {useState} from 'react'
import Search from './Search'
import Bookmarks from './Bookmarks'
import { useSettingsContext } from '../../contextSettings';
import { useTabsContext } from '../../contextTabs';

export default function Features() {
    
    const { settingsState } = useSettingsContext();
    const { isDarkModeOff } = settingsState;

    const { addBookmark } = useTabsContext();

    const [isAddNewTabModal, setAddNewTabModal] = useState(false)
    const [name, setName] = useState('');
    const [URL, setURL] = useState('');

    const [tabIdx, setTabIdx] = useState(0);

    const closeModal = () => {
        setAddNewTabModal(false);
        setName('');
        setURL('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        // close Modal
        closeModal()
        //add new shortcut
        const newLink = { tabIdx, name, URL };
        addBookmark(newLink);
    };
    
    return (
        <section className={isDarkModeOff ? "features light-mode" : "features"}>
            { isAddNewTabModal && 
                <div className="add__tab">
                    <div className="add__tab__wrapper">
                        <h2>Create new bookmark</h2>
                        
                    <form onSubmit={handleSubmit}>
                            <label>name</label>
                            <input
                                id="bookmark-name-input"
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                                autoComplete="off"
                            />

                        <label>URL</label>
                        <input
                            id="bookmark-url-input"
                            type='text'
                            value={URL}
                            onChange={e => setURL(e.target.value)}
                            autoComplete="off"
                        />

                        <div className="button__wrapper">
                            <button className="submit__button" type="submit" disabled={name.length === 0 || URL.length === 0 ? true : false}>Save</button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>

                        </form>
                    </div>
                </div>
            }
            <Search />
            <Bookmarks addModal={setAddNewTabModal} tabIdx={tabIdx} setTabIdx={setTabIdx}/>
        </section>
    )
}