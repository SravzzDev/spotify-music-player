import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch, backgroundColor }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar" style={{ backgroundColor }}>
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={query}
        onChange={handleSearch}
        style={{
            backgroundColor,   // Change background color of the input
            color: '#fff', 
            fontWeight:"bold"    
          }}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
}

export default SearchBar;
