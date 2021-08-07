import React, {useState} from 'react'
import CurrentBackground from './CurrentBackground';

export default function FetchedBackgrounds({ backGround, backgrounds, noResultModal, fetchBackgrounds, ChangeBackground, loading }) {
    //Counts the cindex of the Fetched page from unsplash
    const [currentPage, setCurrentPage] = useState(2);
    // Fetch more images
    const fetchMoreImages = async () => {
        await fetchBackgrounds(currentPage);
        setCurrentPage(currentPage + 1);
    };

    // if Loading and no background have been fetched already
    if (loading && backgrounds.length === 0  ) {
        return (
            <div className="load-more-wrapper">
                <span>Loading...</span>
            </div>
        )
    };
    
    // no background have been fetched
    if (noResultModal) {
        return (
            <div className="load-more-wrapper">
                <p>
                    No Results were found 😢!<br />
                    Search Something else 🦄
                </p>
            </div>
        )
    };
    
    // no background have been fetched
    if (backgrounds.length > 0){
        return (
            <div className = "backgrounds-wrapper" >
                { backgrounds.map(img =>
                    <div className="single-wrapper" key={img.id} onClick={() => ChangeBackground(img)}>
                        <img src={img.urls.thumb} alt={img.alt_description} />
                        </div>
                )}
                {/* if Load more image button is clicked shows loading... otherwise shows button */}
                { loading ? (
                    <div className="load-more-wrapper">
                        <span>Loading...</span>
                    </div>
                ) : (
                    <div className="load-more-wrapper">
                        <button onClick={fetchMoreImages}>Load More images</button>
                    </div>
                )}
            </div>
        )
    };

    return (
        <CurrentBackground backGround={backGround} />
)
}