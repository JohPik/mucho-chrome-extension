/*global chrome*/
import React, { useEffect, useRef } from 'react';

const Search = () => {
    const refContainer = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let query = refContainer.current.value;

        chrome.search.query({
            text: query
        });
    };
    
    useEffect(() => {
        refContainer.current.focus(); 
    });
    
    return (
        <>
            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <input id="myInput" type='text' ref={refContainer} />
                </div>
            </form>
        </>
    );
};

export default Search;