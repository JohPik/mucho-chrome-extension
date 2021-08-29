import React, {useState} from 'react'
import small_white_close from '../../img/small_white_close.svg';

export default function Bookmark({ link, deleteBookmark, tabIdx, shortcutIdx }) {

    const { id, linkName, img, url } = link;

    const [active, isActive] = useState(false);

    if (!active){
        return (
            <div key={id} className="bookmark">
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
        <div key={id} className="bookmark active">
            <p>Delete link?</p>

            <div className="button_wrapper">
                <button className="bookmark__delete4ever-button" onClick={() => deleteBookmark(tabIdx, shortcutIdx)}>
                    Delete
                </button>

                <button className="bookmark__cancel-button" onClick={() => isActive(false)}>
                    Cancel
                </button>
            </div>
        </div>
    )
    
}
