const tabsReducer = (state, action) => {
  //Get saved tabs from Chrome
  if (action.type === 'GET_EXISTING_CHROME_TABS') {
    return action.payload;
  }

  //Add a tab
  if (action.type === 'ADD_TAB') {
    const { name } = action.payload;
    //make a copy of current tab and delete current shortcut
    const newState = [...state];
    //create new Tab
    const newTab = { name: name, links: [] };
    newState.push(newTab);
    return newState;
  }

  //Delete a tab
  if (action.type === 'DELETE_TAB') {
    const tabIdx = action.payload;
    //make a copy of current tab and delete current Tabs
    const newState = [...state];
    newState.splice(tabIdx, 1);
    return newState;
  }

  //Rename a tab
  if (action.type === 'RENAME_TAB') {
    const { clikedTab, name } = action.payload;
    //make a copy of current tab and delete current shortcut
    const newState = [...state];
    newState[clikedTab].name = name;
    return newState;
  }

  //Add a new shortcut
  if (action.type === 'ADD_SHORTCUT') {
    const { tabIdx, name, URL, favicon } = action.payload;
    //make a copy of current tab and delete current shortcut
    const newState = [...state];
    //create new Shortcut
    const newShortcut = {
      linkName: name,
      url: URL,
      img: favicon,
    };

    newState[tabIdx].links.push(newShortcut);

    return newState;
  }

  //Delete a new shortcut
  if (action.type === 'DELETE_SHORTCUT') {
    const { tabIdx, shortcutIdx } = action.payload;
    //make a copy of current tab and delete current shortcut
    const newState = [...state];
    newState[tabIdx].links.splice(shortcutIdx, 1);

    return newState;
  }

  //Edit a shortcut including name - link
  if (action.type === 'EDIT_SHORTCUT') {
    return state;
  }

  throw console.error('I am unkown');
};

export default tabsReducer;
