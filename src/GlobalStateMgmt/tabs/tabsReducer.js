const tabsReducer = (state, action) => {
    //Get saved tabs from Chrome
    if (action.type === "GET_EXISTING_CHROME_TABS") {
        return { ...action.payload };
    }
    //Add a tab
    if (action.type === "ADD_TAB") {
        return state;
    }
    //Delete a tab
    if (action.type === "DELETE_TAB") {
        return state;
    }
    //Rename a tab
    if (action.type === "RENAME_TAB") {
        return state;
    }
    //Add a new shortcut
    if (action.type === "ADD_SHORTCUT") {
        return state;
    }
    //Delete a new shortcut
    if (action.type === "DELETE_SHORTCUT") {
        return state;
    }
    //Edit a shortcut including name - link
    if (action.type === "EDIT_SHORTCUT") {
        return state;
    }

    throw console.error("I am unkown");
}

export default tabsReducer;