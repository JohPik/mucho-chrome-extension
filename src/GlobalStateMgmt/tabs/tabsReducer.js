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
        console.log("CALLL ME")
        const { tabIdx, name, URL } = action.payload
        const newState = [...state];
        const newTab = {
            linkName: name,
            url: URL,
            img: "../img/favicons/youtube.png"};

        newState[tabIdx].links.push(newTab);

        return newState;
    }
    //Delete a new shortcut
    if (action.type === "DELETE_SHORTCUT") {
        const { tabIdx, shortcutIdx } = action.payload
        console.log("the Payload", action.payload);
        //make a copy of current tab and delete current shortcut
        const newState = [...state];
        newState[tabIdx].links.splice(shortcutIdx, 1);

        return newState;
    }
    //Edit a shortcut including name - link
    if (action.type === "EDIT_SHORTCUT") {
        return state;
    }

    throw console.error("I am unkown");
}

export default tabsReducer;