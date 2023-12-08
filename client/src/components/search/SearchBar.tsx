import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";

import "./module.search.css";
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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-container'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} 
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
