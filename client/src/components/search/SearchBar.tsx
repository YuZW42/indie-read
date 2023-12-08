import React, { useState, ChangeEvent } from 'react';
import { Container } from 'react-bootstrap';

import "./module.search.css"
import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Type a title or any keyword"
        className='search-input'
      />
      <button 
        onClick={handleSearch}
        className="search-btn"
      >
        <HiMagnifyingGlass />
      </button>
    </div>
  );
};

export default SearchBar;
