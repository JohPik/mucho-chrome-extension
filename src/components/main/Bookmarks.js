import React, { useState, useEffect} from 'react';
import edit from '../../img/edit.svg';
import plus from '../../img/plus.svg';
import Bookmark from './Bookmark';
import { useTabsContext } from '../../contextTabs';

export default function Bookmarks({ modal, tabIdx, setTabIdx }) {

    const { tabsState, deleteBookmark } = useTabsContext();

    const [currentTab, setCurrentTab] = useState(null);

    const manageTabChange = (tab, idx) => {
        setCurrentTab(tab);
        setTabIdx(idx);
    }

    useEffect( () => {
        setCurrentTab(tabsState[tabIdx]);
    }, [tabsState, tabIdx]);

    if(!currentTab) return <h2>Loading</h2>

    return (
        <div className="bookmarks"> 

            <div className="bookmarks__navigation">
                <ul>
                    { tabsState.map( (tab, idx) =>
                            <li key={idx} className={idx === tabIdx ? "active" : null}>
                                <button onClick={() => manageTabChange(tab, idx)}>
                                    {tab.name}
                                </button>
                                <button className="bookmarks__edit-button">
                                <img src={edit} alt="edit bookmark" />
                                </button>
                            </li>
                    )}
                    { tabsState.length < 6 && 
                        <li>
                            <button onClick={() => modal("createTab")}>
                                <img src={plus} alt="add bookmark" />
                            </button>
                        </li>
                    }
                </ul>
            </div>

            <div className="bookmarks__links">
                { currentTab && 
                    <>
                        {currentTab.links.map( (link, idx) => 
                            <Bookmark 
                                key={idx}
                                link={link} 
                                shortcutIdx={idx}
                                tabIdx={tabIdx}
                                deleteBookmark={deleteBookmark}/> 
                        )}

                        {currentTab.links.length < 10 &&
                            <div className="bookmark add__new">
                                <button onClick={() => modal("createShortcut")}>
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
