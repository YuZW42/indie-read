import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults'; 
const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  const handleSearch = async (keyword: string) => {
    try {
      const response = await axios.get('https://indie-read-production.up.railway.app/search_keyword', {
        params: {
          keyword: keyword,
        },
      });

      setSearchResults(response.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} loading={true}/>
    </>
  );
};

export default Search;
