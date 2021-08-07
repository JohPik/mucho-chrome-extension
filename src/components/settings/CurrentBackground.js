import React from 'react'

export default function CurrentBackground({backGround}) {
    return (
        <div className="current-background">
            <div className="img-wrapper">
                <img src={backGround.urls.regular} alt="" />
            </div>
            <div className="current-background_text">
                <p>Current Background</p>
                <p>Photo by <span className="photographer_name"><a href="">{backGround.user.name}</a></span></p>
            </div>
        </div>
    )
}
