import React, { useState, useEffect} from 'react';
import edit from '../../img/edit.svg';
import plus from '../../img/plus.svg';
import Tabs from '../../utilities';
import { useTabsContext } from '../../contextTabs';

export default function Bookmarks() {

    const [currentTab, setCurrentTab] = useState(null);


    const { tabsState } = useTabsContext();

    useEffect( () => {
        setCurrentTab(tabsState[0]);
    }, [tabsState]);

    if (!currentTab){
        return(
            <h2>Loading</h2>
        )
    }

    return (
        <div className="bookmarks">

            <div className="bookmarks__navigation">
                <ul>
                    {
                        tabsState.map( tab =>
                            <li key={tab.id} className={tab.id === currentTab.id ? "active" : null}>
                                <button onClick={() => setCurrentTab(tab)}>
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
                        {currentTab.links.map(link => {
                                const { id, linkName, img, url } = link;
                            
                                return (
                                    <div key={id} className="bookmark">
                                        <a href={url}>
                                            <img className="bookmark__favicon" src={img} alt={`${linkName} link`} />
                                        </a>
                                        <a href={url}>
                                            <p>{linkName}</p>
                                        </a>
                                        <button className="bookmark__edit-button">
                                            <img src={edit} alt="edit bookmark" />
                                        </button>
                                    </div>
                                )
                        })}
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
