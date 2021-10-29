import faviconColor from '../../faviconColor';

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
* 
* @param {bitmap} img - The bitmap of the Image.
* @return {Promise} - The url of freshly generated Favicon
*/
const makeStandardFavicon = (name) => {
    
    //get a ramdom color
    const colorName = getColor();

    return new Promise(res => {
        // create a canvas
        const canvas = document.createElement('canvas');
        canvas.width = 48;
        canvas.height = 48;
        
        
        let ctx = canvas.getContext("2d");
        // Write Name on Canvas
        const text = name.length >= 3 ? name.slice(0, 3) : name;
        ctx.font = '300 15px Arial';
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillStyle = faviconColor[colorName].text;
        ctx.fillText(text.toUpperCase() ,canvas.width/2, canvas.height/2);

        // Apply background to Canvas
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
const getFavicon = async (URL, name) => {
    //url of favicon that is return at the end of funciton
    let faviconURL;

    await getGoolgeIcon(`chrome://favicon/size/48@1x/${URL}`)
        .then( async img => {
            // case 1 - if the Height and Width are equal to 48 we have a google favicon.
            // case 2 - we got a dummy favicon, so we need to make our own.
            return img.height === 48 && img.width === 48 ? await makeGoogleFavicon(img) : await makeStandardFavicon(name);
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

export default getFavicon;