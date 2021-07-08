import React from 'react'

export default function Footer({openModal}) {
    return (
        <footer>
            <button className="settings__button" onClick={() => openModal(true)}></button>
            <div className="photo_copyright">Photo by Pawel Czerwinski</div>
        </footer>
    )
}
