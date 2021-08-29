import React, { useState, useEffect} from 'react';
import edit from '../../img/edit.svg';
import plus from '../../img/plus.svg';
import Bookmark from './Bookmark';
import { useTabsContext } from '../../contextTabs';

export default function Bookmarks() {

    const { tabsState, deleteBookmark } = useTabsContext();

    const [currentTab, setCurrentTab] = useState(null);
    const [tabIdx, setTabIdx] = useState(0);

    const manageTabChange = (tab, idx) => {
        setCurrentTab(tab);
        setTabIdx(idx);
    }

    useEffect( () => {
        setCurrentTab(tabsState[tabIdx]);
    }, [tabsState, tabIdx]);

    if (!currentTab){
        return <h2>Loading</h2>
    }

    return (
        <div className="bookmarks">

            <div className="bookmarks__navigation">
                <ul>
                    {
                        tabsState.map( (tab, idx) =>
                            <li key={tab.id} className={tab.id === currentTab.id ? "active" : null}>
                                <button onClick={() => manageTabChange(tab, idx)}>
                                    {tab.name}
                                </button>
                                <button className="bookmarks__edit-button">
                                <img src={edit} alt="edit bookmark" />
                                </button>
                            </li>
                        )
                    }
                </ul>
            </div>

            <div className="bookmarks__links">
                { currentTab && 
                    <>
                        {currentTab.links.map( (link, idx) => 
                            <Bookmark 
                                key={link.id}
                                link={link} 
                                shortcutIdx={idx}
                                tabIdx={tabIdx}
                                deleteBookmark={deleteBookmark}/> 
                        )}

                        {currentTab.links.length < 10 &&
                            <div className="bookmark add__new">
                                <button>
                                    <img src={plus} alt="add bookmark" />
                                    <p>add new</p>
                                </button>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
