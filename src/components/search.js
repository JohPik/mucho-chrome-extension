/*global chrome*/
import React, { useState , useEffect } from 'react';

const Search = () => {
    
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        chrome.search.query({
            text: query
        });
    };

    return (
        <div className='search'>
            <form onSubmit={handleSubmit}>
                <input
                    id="search-engine-input"
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search"
                />
                <button type="submit"></button>
            </form>
        </div>
    );
};

export default Search;