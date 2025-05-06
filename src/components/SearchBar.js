import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => setQuery(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (query.trim()) {
            onSearch(query); // Call the onSearch function passed as prop
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search for movies..."
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Ensure the function is passed as a prop
};

export default SearchBar;
