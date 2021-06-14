import React, { useEffect, useRef } from 'react';

const Search = () => {
    const refContainer = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(refContainer.current.value);
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