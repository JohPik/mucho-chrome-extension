import React, { useState, useEffect} from 'react';
import threeDots from '../img/three-dots.svg';
import favicons from '../img/favicons/amazon.png';
import Tabs from '../utilities';

export default function Bookmarks() {

    const [currentTab, setCurrentTab] = useState(null);
    const [tabNav, setTabNav] = useState(Tabs);

    useEffect( () => {
        setCurrentTab(tabNav[0]);
    }, []);

    console.log("currentTab", currentTab)
    return (
        <div className="bookmarks">

            <div className="bookmarks__navigation">
                <ul>
                    {
                        tabNav.map(tab => 
                                <li key={tab.id}>
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
