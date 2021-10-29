const tabsReducer = (state, action) => {
    //Get saved tabs from Chrome
    if (action.type === "GET_EXISTING_CHROME_TABS") {
        return { ...action.payload };
    }
    //Add a tab
    if (action.type === "ADD_TAB") {
        const { name } = action.payload;
        //make a copy of current tab and delete current shortcut
        const newState = [...state];
        //create new Tab
        const newTab = {name: name, links: []}
        newState.push(newTab);
        return newState;
    }
    //Delete a tab
    if (action.type === "DELETE_TAB") {
        return state;
    }
    //Rename a tab
    if (action.type === "RENAME_TAB") {
        const { clickedEditTab, name } = action.payload;
        //make a copy of current tab and delete current shortcut
        const newState = [...state];
        newState[clickedEditTab].name = name;
        
        return newState;
    }
    //Add a new shortcut
    if (action.type === "ADD_SHORTCUT") {
        const { tabIdx, name, URL, favicon } = action.payload;
        //make a copy of current tab and delete current shortcut
        const newState = [...state];
        //create new Shortcut
        const newShortcut = {
            linkName: name,
            url: URL,
            img: favicon
            // img: 'https://www.google.com/s2/favicons?sz=64&domain_url=amazon.com'
            // img: 'chrome://favicon/size/24@1x/https://www.apple.com'
            // img: 'chrome://favicon2/?size=24&scale_factor=1x&show_fallback_monogram=&page_url=https%3A%2F%2Fwww.amazon.com'
        };

        newState[tabIdx].links.push(newShortcut);

        return newState;
    }
    //Delete a new shortcut
    if (action.type === "DELETE_SHORTCUT") {
        const { tabIdx, shortcutIdx } = action.payload;
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