import React, { useState, ChangeEvent } from 'react';

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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
