import React from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});

export default function BackGroundImage() {

    // const getQuote = () => {
    //     unsplash.search.getPhotos({
    //         query: 'cat',
    //         page: 1,
    //         perPage: 10,
    //         orientation: 'landscape',
    //     })
    //         .then(data => {
    //             console.log(data.response.results);
    //         })
    // };

    // getQuote()

    return ( 
        <div>
            I am Backgfround 
        </div>
    )
}
