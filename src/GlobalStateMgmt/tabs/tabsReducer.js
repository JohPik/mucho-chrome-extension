import cloneDeep from 'lodash/cloneDeep';
// import base64ToBlob from "../../faviconUtilities/base64ToBlob";


const tabsReducer = (state, action) => {
    //Get saved tabs from Chrome
    if (action.type === "GET_EXISTING_CHROME_TABS") {
        return action.payload;
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
        const tabIdx = action.payload;
        //make a copy of current tab and delete current Tabs
        const newState = [...state];
        newState.splice(tabIdx, 1);
        return newState;
    }

    //Rename a tab
    if (action.type === "RENAME_TAB") {
        const { clikedTab, name } = action.payload;
        //make a copy of current tab and delete current shortcut
        const newState = [...state];
        newState[clikedTab].name = name;
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
            // img: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA9RJREFUaEPtVm1IU1EYfrSynKbOjII20kyz0v4Y1TJTKkgU1MotR5LYlxBFURT0IRV9/OjrR/UrwkjCOYNpo4V9TJ00agRpajhzNKuZzlqpmQqra5xLDlfL5b23RXDOv+2873Pe53ne95zr97SwcBj/8fKjBP6xe9SBf2wAqAPUAZ4K0BbiKSDvdOoAbwl5AlAHeArIO506wFtCngB/zYFvDAP7ly+YERSECf7+PMv8ffqYBBwDA1hfVgZxYCDUcjkmT5zohnSntRUnamuxRyZD3qJF7N7rnh6cMxphstlcsalRUciIjUVqZKTrP93LlzheU4NyhQJRYrEb7n2LBUf0epTm5CBm2rQxyXt1oNJsxmmDAYWLF2NbYqILrGdoCFmlpYgMC0Nxdjar8vOuLmy7fRuiSZOwc8kSzBGL0epwQGs2w/rpEw6uWAH5woUsxgh5TwTuWSw4qtfj5oYNmBcRwY8AMzyMXTodnnZ0QJObC2loKAt40mBgC7u1cSNLgsTlazR409sLtUKBmcHBroN7h4agKC/Hx8FB3M3Lw/SgIN8RIFXY+vqwTqXCUokEVzIyUN/ZiR1aLfYtXw5lQgJb6LPOThRqtdgrk2HTj3YaLd0Tmw27dTqcXLUKaTExviVAClE3N+O80Yhjqam4Xl/PzsXVzEz4+/mxdVa0tOBMXd1v+3bA6URKcTFy4+OxPynJ9wTIrbJdq0WT3c4WPLqdyO8rJhNuNDTgYX4+QqdM8di32SoVIkQiXMvK8j0BUlFzdzcKKip+GWiyd+vFC5x99AiVSiVmhYR4JEAcWBMdjaKUFFS1taGoutrjoI7cUGVyOaLDw/kN8ejskVk4lJyM9QsWuAG3vH+PzRoNTq1ejbVz5/5yKLmFyCCT4jPj4tBot2NrZSUupqUhefZst/iShgZcNplQU1CA4IAA3xD4yjDIUasx6HSyt1DYqDZyMgz2V1Xh8du3qFAqIQkJYW+ktSUlUMTH40BSkluR5Cpuczhg2LJlzOLJptd34E8dIHHvPn9mW4ys7YmJmBMeDnt/P0obG2H+8AGX0tMhk0pdkEV6PaosFmTFxWGZVAqGYfDg1SvUWq1ub8ZYLMZFoKOvD2QQD69ciXXz53vEJa2iamqCob2dVZks0iJE6WUSiVsOceaC0Ygaq9UVS17e9NhY18vuzYJxEfAG9vN+V38/potEf/QtRJwSBQRgqpee//mMv0pgvIS5xFMCXFQTMoc6IKSaXLCoA1xUEzKHOiCkmlywqANcVBMyhzogpJpcsKgDXFQTMoc6IKSaXLCoA1xUEzLnO5bd/8DkNm/kAAAAAElFTkSuQmCC"
            img: favicon
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