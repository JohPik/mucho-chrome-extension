import React, {useState} from 'react'
import small_white_close from '../../img/small_white_close.svg';

export default function Bookmark({ link, deleteBookmark, tabIdx, shortcutIdx }) {

    const { linkName, img, url } = link;

    const [active, isActive] = useState(false);

    const manageDelete = (tabIdx, shortcutIdx) => {
        isActive(false);
        deleteBookmark(tabIdx, shortcutIdx);
    }

    if (!active){
        return (
            <div className="bookmark">
                <a href={url}>
                    <img className="bookmark__favicon" src={img} alt={`${linkName} link`} />
                </a>
                <a href={url}>
                    <p>{linkName}</p>
                </a>
                <button className="bookmark__delete-button" onClick={() => isActive(true)}>
                    <img src={small_white_close} alt="delete bookmark" />
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
