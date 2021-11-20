import React, {useState, useEffect} from 'react'
import small_white_close from '../../img/small_white_close.svg';

export default function Bookmark({ linkName, favicon, url, deleteBookmark, tabIdx, shortcutIdx }) {

    // console.log("Re Render in Bookmark - link URL", link.img.faviconURL );

    // // const { linkName, url } = link;
    // const [linkName, setLinkNAme] = useState("");
    // const [url, setURL] = useState("");
    // const [favicon, setFavicon] = useState("");

    // console.log("Favicon from Single Bookmark", favicon);

    // const favicon = link.img.faviconURL;
    const [active, isActive] = useState(false);

    const manageDelete = (tabIdx, shortcutIdx) => {
        isActive(false);
        deleteBookmark(tabIdx, shortcutIdx);
    }

    // useEffect(() => {
    //     const { linkName, url, img } = link;
    //     setLinkNAme(linkName);
    //     setURL(url);
    //     setFavicon(img.faviconURL);

    //     console.log("LINK HAS CHANGED in Bookmark")
    //     console.log("linkName", linkName)
    //     console.log("favicon", favicon)
    // }, [])

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
