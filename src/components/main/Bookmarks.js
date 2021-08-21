import React, { useState, useEffect} from 'react';
import threeDots from '../../img/three-dots.svg';
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
                                </li>
                        )
                    }
                </ul>
                <button className="bookmarks__navigation__edit-button"></button>
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
                                            <p>{linkName}</p>
                                            <button className="bookmark__edit-button">
                                                <img src={threeDots} alt="" />
                                            </button>
                                        </a>
                                    </div>
                                )
                        })}
                    </>
            }
            </div>
        </div>
    )
}
