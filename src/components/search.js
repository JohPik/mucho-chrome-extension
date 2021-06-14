/*global chrome*/
import React, { useState } from 'react';

const Search = () => {
    
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        chrome.search.query({
            text: query
        });
    };


    return (
        <>
            {/* Temporary Text START*/}
            <h2>SEARCH</h2>
            {/* Temporary Text END*/}

            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <input 
                        id="myInput" 
                        type='text' 
                        value={query} 
                        onChange={ e => setQuery(e.target.value)}
                    />
                </div>
            </form>
        </>
    );
};

export default Search;


/* OLD Version using useRef*/
// import React, { useEffect, useRef } from 'react';

// const Search = () => {
//     const refContainer = useRef(null);

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         let query = refContainer.current.value;

//         chrome.search.query({
//             text: query
//         });

//         refContainer.current.value = '';
//     };

//     useEffect(() => {
//         refContainer.current.focus();
//     });

//     return (
//         <>
//             <form className='form' onSubmit={handleSubmit}>
//                 <div>
//                     <input id="myInput" type='text' ref={refContainer} />
//                 </div>
//             </form>
//         </>
//     );
// };

// export default Search;