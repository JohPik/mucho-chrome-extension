/**
 * Helper Function Turning a base64 String into a blob
 * @param {base64} String
 * @returns {newUrl} Blob URL Address
 */

const base64ToBlob = async base64 => {
    const base64Response =  await fetch(base64);
    const blob = await base64Response.blob();
    let newImg = document.createElement('img')
    newImg.src = window.URL.createObjectURL(blob);
    let newURL = newImg.src; 
    return newURL;
}

export default base64ToBlob;