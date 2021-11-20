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
        // console.log("THIS IS Current State from Use Effect", currentTab);
    }, [tabsState, tabIdx]);

    return (
        <div className="bookmarks"> 
            { tabsState.length === 0 ? 
                <div className="bookmarks__navigation__no_tab">
                    <button onClick={() => modal("createTab")}>Add a new bookmark tab</button>
                </div>
                : 
                <div className="bookmarks__navigation">
                    <ul>
                        { tabsState.map( (tab, idx) =>
                                <li key={idx} className={idx === tabIdx ? "active" : null}>
                                    <button onClick={() => manageTabChange(tab, idx)}>
                                        {tab.name.length > 13 ? tab.name.slice(0,10) + "..." : tab.name}
                                    </button>
                                    <button className="bookmarks__edit-button" onClick={() => modal("editTab", idx)}>
                                    <img src={edit} alt="edit bookmark" />
                                    </button>
                                </li>
                        )}
                        { tabsState.length < 5 && 
                            <li>
                                <button onClick={() => modal("createTab")}>
                                    <img src={plus} alt="add bookmark" />
                                </button>
                            </li>
                        }
                    </ul>
                </div>
            }
            { currentTab &&
                <div className="bookmarks__links">
                    {currentTab.links.map( (link, idx) => {
                        // console.log("FAVICON 1: ", link.img);
                        // console.log("FAVICON 2: ", currentTab.links[idx].img.faviconURL);
                        // console.log("FAVICON 3: ", currentTab.links[idx]);
                        // console.log("FAVICON 4: ", currentTab.links[idx].img);
                        // console.log("FAVICON 5: ", currentTab.links[idx].img["faviconURL"]);
                        // const newObject = {...currentTab.links[idx].img};
                        // console.log("FAVICON 6: ", newObject);
                        // console.log("FAVICON 7: ", newObject.faviconURL);
                        // // const newerNewObject = [...tabsState][0].links[idx].img;
                        // // const newString = newerNewObject.faviconURL + "HELLO FUCKER"
                        // // console.log("FAVICON 8: ", newerNewObject);
                        // // console.log("FAVICON 9: ", newString);
                        // let cloneObj = JSON.parse(JSON.stringify(currentTab.links[idx].img));
                        // console.log("FAVICON 8: ", cloneObj);
                        return <Bookmark 
                            key={idx}
                            
                            linkName = {link.linkName}
                            url = {link.url}
                            favicon = {link.img.faviconURL} 
                            shortcutIdx={idx}
                            tabIdx={tabIdx}
                            deleteBookmark={deleteBookmark}/> 
                    })}

                    {currentTab.links.length < 10 &&
                        <div className="bookmark add__new">
                            <button onClick={() => modal("createShortcut")}>
                                <img src={plus} alt="add bookmark" />
                                <p>add new</p>
                            </button>
                        </div>
                    }
                </div>
            }
            
        </div>
    )
}
