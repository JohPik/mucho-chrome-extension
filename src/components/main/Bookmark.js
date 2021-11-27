import React, {useState, useEffect} from 'react'
import close from '../../img/small_white_close.svg';
import closeLight from '../../img/small_white_close-light.svg';

export default function Bookmark({ linkName, favicon, url, deleteBookmark, tabIdx, shortcutIdx, isDarkModeOff }) {

    const [active, isActive] = useState(false);

    const manageDelete = (tabIdx, shortcutIdx) => {
        isActive(false);
        deleteBookmark(tabIdx, shortcutIdx);
    }

    if (!active){
        return (
            <div className="bookmark">
                <a href={url}>
                    <img className="bookmark__favicon" src={"blob:chrome-extension://" + favicon} alt={`${linkName} link`} />
                </a>
                <a href={url}>
                    <p>{linkName.length > 10 ? linkName.slice(0,7) + "..." : linkName}</p>
                </a>
                <button className="bookmark__delete-button" onClick={() => isActive(true)}>
                    <img alt="delete bookmark" src={ isDarkModeOff ? closeLight : close}/>
                </button>
            </div>
        )
    }

    return (
        <div className="bookmark active">
            <p>Delete link?</p>

            <div className="button_wrapper">
                <button className="bookmark__delete4ever-button" onClick={() => manageDelete(tabIdx, shortcutIdx)}>
                    Delete
                </button>

                <button className="bookmark__cancel-button" onClick={() => isActive(false)}>
                    Cancel
                </button>
            </div>
        </div>
    )
    
}
