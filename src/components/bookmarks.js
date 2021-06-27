import React from 'react'
import threeDots from '../img/three-dots.svg';
import favicons from '../img/favicons/amazon.png';

export default function Bookmarks() {
    return (
        <div className="bookmarks">

            <div className="bookmarks__navigation">
                <ul>
                    <li>home</li>
                    <li>shopping</li>
                    <li>sports</li>
                    <li>streaming</li>
                    <li>entertainment</li>
                </ul>
                <button className="bookmarks__navigation__edit-button"></button>
            </div>

            <div className="bookmarks__links">
                <div className="bookmark">
                    <a href="/">
                        <img className="bookmark__favicon" src={favicons} alt="" />
                        <p>amazon</p>
                        <button className="bookmark__edit-button">
                            <img src={threeDots} alt="" />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    )
}
