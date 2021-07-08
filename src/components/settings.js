import React from 'react'

export default function Settings({closeModal}) {

    return (
        <div className="settings" onClick={() => closeModal(false)}>
            <button>close me</button>
            settings
        </div>
    )
}
