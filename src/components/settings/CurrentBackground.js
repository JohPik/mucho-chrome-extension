import React from 'react'

export default function CurrentBackground({backGround}) {

    let { photographer, url, img } = backGround;

    return (
        <div className="current-background">
            <div className="img-wrapper">
                <img src={img} alt="" />
            </div>
            <div className="current-background_text">
                <p>Current Background</p>
                <p>Photo by <span className="photographer_name"><a href={url}>{photographer}</a></span></p>
            </div>
        </div>
    )
}
