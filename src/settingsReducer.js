const settingsReducer = (state, action) => {

    if (action.type === "TOGGLE_DARK_MODE"){
        return { ...state, isDarkModeOff: !state.isDarkModeOff}
    }

    if (action.type === "CHANGE_TIME_FORMAT") {
        return { ...state, timeFormat: action.payload}
    }

    if (action.type === "DISABLE_QUOTE") {
        return { ...state, isQuoteDisable: !state.isQuoteDisable}
    }

    if (action.type === "CHANGE_QUOTE_THEME") {
        return { ...state, quoteTheme: action.payload}
    }

    if (action.type === "CHANGE_BACKGROUND") {
        return { ...state, backGround: action.payload }
    }

    throw console.error("I am unkown");

}

export default settingsReducer;