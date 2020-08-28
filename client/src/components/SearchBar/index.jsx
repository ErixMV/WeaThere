// Component: Input for Algolia API search bar.

import React, { forwardRef } from "react";

const SearchBar = forwardRef(({ city, changeHandler, submitHandler }, ref) => {
    return (
        <div className="search-container">
            <input className="cities-input" value={city} onChange={changeHandler} type="search" id="cities-input" placeholder="Search city..." ref={ref} />
        </div>
    );
});

export default SearchBar;