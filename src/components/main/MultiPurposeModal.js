import React, {useState, useEffect} from 'react'
import { useTabsContext } from '../../contextTabs';
import getFavicon from './getFavicon';

export default function MultiPurposeModal({ setIsModal,  useCase, tabIdx }) {


    const { addTab, addBookmark } = useTabsContext();

    // Manage different Case Scenarios
    const useCases = {
        createTab: {
            type: "tab",
            message: "create new tab",
            fieldEmpty: true,
            validate: addTab
        },
        editTab: {
            type: "tab",
            message: "edit tab",
            fieldEmpty: false
        },
        createShortcut: {
            type: "shortCut",
            message: "create new shortcurt",
            fieldEmpty: true,
            validate: addBookmark
        }, 
        editShortcut: {
            type: "shortCut",
            message: "edit shortcurt",
            fieldEmpty: false
        }
    }

    const [currentCase, setCurrentCase] = useState(null);
    
    useEffect(() => {
        setCurrentCase(useCases[useCase]);
    }, [])

    //Form Management need to work on that
    const [name, setName] = useState('');
    const [URL, setURL] = useState('');

    const closeModal = () => {
        setIsModal(false);
        setName('');
        setURL('');
    }
    
    /**
     * Handle Form Submition
     * First Check what type of Case in curent context
     * Tab or Shotcut -> to validate the right variables
     */
    const handleSubmit = async e => {
        e.preventDefault();
        //manage validation
        const {type, validate} = currentCase;
        // when it is a tab we only care about the name
        if(type === "tab") {
            validate({name})
        } else { // when it is a shortcut we need the tableIdx, name, URL and Favicon
            // Get a Favicon
            const favicon = await getFavicon(URL, name);
            validate({tabIdx, name, URL, favicon})
        }
        // close Modal
        closeModal();
        // addBookmark(newLink);
    };

    if(!currentCase) return <h2>LOADING...</h2>
    
    return (
            <div className="add__tab">
                <div className="add__tab__wrapper">
                    <h2>{currentCase.message}</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <label>name</label>
                        <input
                            id="bookmark-name-input"
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                            autoFocus
                            autoComplete="off"
                        />
                        { currentCase.type === "shortCut" && ( 
                            <>
                            <label>URL</label>
                            <input
                                id="bookmark-url-input"
                                type='text'
                                value={URL}
                                onChange={e => setURL(e.target.value)}
                                autoComplete="off"
                            />
                            </>
                        )}
                        <div className="button__wrapper">
                            <button 
                                className="submit__button" 
                                type="submit" 
                                disabled={(name.length === 0) || (currentCase.type === "shortCut" && URL.length === 0 ) ? true : false}>
                                Save
                            </button>
                            <button onClick={closeModal}>Cancel</button>
                        </div>

                    </form>
            
                </div>
            </div>
    )
}
