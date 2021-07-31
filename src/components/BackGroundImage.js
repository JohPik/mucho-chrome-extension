import React, {useState} from 'react'
import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
    headers: { 'X-Custom-Header': 'foo' },
});

// alt_description: "orange Persian cat sleeping"
// blur_hash: "LNH_JX~A-;xa%0-;IUS49}SiV@M|"
// categories: []
// color: "#d9c0c0"
// created_at: "2017-11-18T17:37:23-05:00"
// current_user_collections: []
// description: null
// height: 3679
// id: "9UUoGaaHtNE"
// liked_by_user: false
// likes: 891
// links: { self: "https://api.unsplash.com/photos/9UUoGaaHtNE", html: "https://unsplash.com/photos/9UUoGaaHtNE", download: "https://unsplash.com/photos/9UUoGaaHtNE/download", download_location: "https://api.unsplash.com/photos/9UUoGaaHtNE/downlo…HwxfHNlYXJjaHwxfHxjYXR8ZW58MHwwfHx8MTYyNzcxMDQyMw" }
// promoted_at: "2017-11-19T23:26:03-05:00"
// sponsorship: null
// tags: (3)[{ … }, { … }, { … }]
// updated_at: "2021-07-31T00:03:58-04:00"
// urls: { raw: "https://images.unsplash.com/photo-1511044568932-33…fHxjYXR8ZW58MHwwfHx8MTYyNzcxMDQyMw&ixlib=rb-1.2.1", full: "https://images.unsplash.com/photo-1511044568932-33…XR8ZW58MHwwfHx8MTYyNzcxMDQyMw&ixlib=rb-1.2.1&q=85", regular: "https://images.unsplash.com/photo-1511044568932-33…MHwwfHx8MTYyNzcxMDQyMw&ixlib=rb-1.2.1&q=80&w=1080", small: "https://images.unsplash.com/photo-1511044568932-33…8MHwwfHx8MTYyNzcxMDQyMw&ixlib=rb-1.2.1&q=80&w=400", thumb: "https://images.unsplash.com/photo-1511044568932-33…8MHwwfHx8MTYyNzcxMDQyMw&ixlib=rb-1.2.1&q=80&w=200" }
// user: { id: "Cyb_dHDIE4o", updated_at: "2021-07-30T16:13:48-04:00", username: "ludemeula", name: "Ludemeula Fernandes", first_name: "Ludemeula", … }
// width: 5518


const Backgrounds = ({ backgrounds, getBackground }) => {
    console.log(backgrounds)
    return(
        <div className="background-wrapper">
            {backgrounds.map( img => 
                <div className="single-wrapper" key={img.id}>
                    <img src={img.urls.thumb} alt={img.alt_description} />
                </div>
            )}
            <div className="load-more-wrapper">
                <button onClick={getBackground}>Load More images</button>
            </div>
        </div>
    );
};


export default function BackGroundImage() {

    const [backgrounds, setBackgrounds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchBackgrounds = async () => {
        return unsplash.search.getPhotos({
            query: 'cat',
            page: currentPage,
            perPage: 28,
            orientation: 'landscape',
        })
            .then(data => {
                setCurrentPage(currentPage + 1)
                return data.response.results
            })
    }

    const getBackground = async () => {
        const newBackgrounds = await fetchBackgrounds();
        
        if(currentPage === 1) {
            setBackgrounds(newBackgrounds);
        } else {
            const combinedBackgrounds = [...backgrounds].concat(newBackgrounds)
            console.log(combinedBackgrounds)
            setBackgrounds(combinedBackgrounds);
        }
    }

    return ( 
        <>
            <button className="temp" onClick={getBackground}>Generate Images</button>
            {backgrounds.length > 0 && <Backgrounds backgrounds={backgrounds} getBackground={getBackground}/>}
        </>
    )
}
