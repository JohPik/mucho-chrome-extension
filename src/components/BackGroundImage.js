import React, {useState} from 'react'

export default function BackGroundImage({ backgrounds, fetchBackgrounds }){

    const [currentPage, setCurrentPage] = useState(2);


    const fetchMoreImages = async() => {
        await fetchBackgrounds(currentPage);
        setCurrentPage(currentPage + 1)
    };

    return(
        <div className="background-wrapper">
            {backgrounds.map(img =>
                <div className="single-wrapper" key={img.id}>
                    <img src={img.urls.thumb} alt={img.alt_description} />
                </div>
            )}
            <div className="load-more-wrapper">
                <button onClick={fetchMoreImages}>Load More images</button>
            </div>
        </div>
    )
};