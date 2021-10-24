import React, {useState, useEffect} from 'react'
import { useTabsContext } from '../../contextTabs';
import faviconColor from '../../faviconColor';

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
    * Create a bitmap[img] of a google favicon. 
    * shared on https://stackoverflow.com/questions/46399223/async-await-in-image-loading
    * Thank you 🙏 
    * 
    * @param {string} URL - The url source of the google favicon.
    * @return  {bitmap [img]} of URL 
    */
    const getGoolgeIcon = async URL => {
        const img = new Image();
        img.src = URL
        await img.decode();
        return await createImageBitmap(img);
    }


    /**
    * Generate a Google favicon to be used by new bookmarks
    * Create a Canvas from an Img Bitmap and makes a blob out of the Canvas
    * shared on https://stackoverflow.com/questions/52959839/convert-imagebitmap-to-blob
    * Thank you 🙏 
    * 
    * @param {bitmap} img - The bitmap of the Image.
    * @return {Promise} - The url of freshly generated Favicon
    */
    const makeGoogleFavicon = img => {
        console.log("I am a Google FAVICON");
        return new Promise(res => {
            // create a canvas
            const canvas = document.createElement('canvas');
            
            // resize it to the size of our ImageBitmap
            canvas.width = img.width;
            canvas.height = img.height;
            
            // try to get a bitmaprenderer context
            let ctx = canvas.getContext('bitmaprenderer');
            
            if(ctx) {
                // transfer the ImageBitmap to it
                ctx.transferFromImageBitmap(img);
            }
            else {
                // in case someone supports createImageBitmap only
                // twice in memory...
                canvas.getContext('2d').drawImage(img,0,0);
            }
            // get it back as a Blob
            canvas.toBlob(res);
        });
    }

    /**
    * Generate a custom Favicon
    * @TODO 
    * 
    * @param {bitmap} img - The bitmap of the Image.
    * @return {Promise} - The url of freshly generated Favicon
    */
    const makeStandardFavicon = () => {
        
        //get a ramdom color
        const colorName = getColor();

        return new Promise(res => {
            // create a canvas
            const canvas = document.createElement('canvas');
            canvas.width = 48;
            canvas.height = 48;
            
            // Write Hello on Canvas
            let ctx = canvas.getContext("2d");

            ctx.font = "15px Arial";
            ctx.textBaseline = 'middle';
            ctx.textAlign = "center";
            ctx.fillStyle = faviconColor[colorName].text;
            ctx.fillText("Hello",canvas.width/2, canvas.height/2);
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = faviconColor[colorName].bkgrd;
            ctx.fillRect(0, 0, 48, 48);
    
            // get it back as a Blob
            canvas.toBlob(res);
        });
    }

    //return a random Color 
    const getColor = () => {
        const faviconColorArray  = Object.keys(faviconColor);
        const randomNumber = Math.random();
        const faviconColorIndex  = Math.floor(randomNumber * faviconColorArray.length);
        return faviconColorArray[faviconColorIndex];
    }
    
    const randomProperty = obj => {
    let keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
    };


    /**
    * Generate a favicon to be used by new book marks
    * shared on https://stackoverflow.com/questions/52959839/convert-imagebitmap-to-blob
    * Thank you 🙏 
    * 
    * @constructor
    * @param {string} URL - The url source of the google favicon.
    * @return {String} faviconURL - The url of freshly generated Favicon
    */
    const getFavicon = async URL => {
        //url of favicon that is return at the end of funciton
        let faviconURL;

        await getGoolgeIcon(`chrome://favicon/size/48@1x/${URL}`)
			.then( async img => {
                // case 1 - if the Height and Width are equal to 48 we have a google favicon.
                // case 2 - we got a dummy favicon, so we need to make our own.
                return img.height === 48 && img.width === 48 ? await makeGoogleFavicon(img) : await makeStandardFavicon();
            })
            .then(blob => {
                // Create a newImg and store the Blob as img source
                let newImg = document.createElement('img')
                newImg.src = window.URL.createObjectURL(blob);

                faviconURL = newImg.src;
            })
            .catch(e => console.log(e));

        return faviconURL;
    }


    const handleSubmit = async e => {
        e.preventDefault();

        //Get a Favicon
        const favicon = await getFavicon(URL);

        //manage validation
        const {type, validate} = currentCase;
        type === "tab" ? validate({name}) : validate({tabIdx, name, URL, favicon});

        // close Modal
        closeModal();
        
        //add new shortcut
        // const image = `https://s2.googleusercontent.com/s2/favicons?domain=https://${URL}&sz=64`
        // const newLink = { tabIdx, name, URL };
        
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
