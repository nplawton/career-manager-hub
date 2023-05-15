import React, { useState } from 'react';
import './search.css'

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Students"
        className='student-search-bar'
        />
    </form>
    );
};

export default SearchBar;
