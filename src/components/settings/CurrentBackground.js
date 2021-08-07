import React from 'react'

export default function CurrentBackground({backGround}) {
    let img = backGround.urls.regular;
    let name = backGround.user.name;
    let link = backGround.links.html;
    return (
        <div className="current-background">
            <div className="img-wrapper">
                <img src={img} alt="" />
            </div>
            <div className="current-background_text">
                <p>Current Background</p>
                <p>Photo by <span className="photographer_name"><a href={link}>{name}</a></span></p>
            </div>
        </div>
    )
}
