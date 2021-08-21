import React from 'react'
import { defaultState } from "../../GlobalStateMgmt/settings/settingsState"

export default function ResetDefaultSettings({ settingsState, ResetToDefault }) {
    return (
        <>
            {JSON.stringify(settingsState) !== JSON.stringify(defaultState) && (
                <button className="reset-default" onClick={ResetToDefault}>Reset Settings</button>
            )}
        </>
    )
}
