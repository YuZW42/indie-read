import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults'; 
import NavBar from "../components/shared/NavBar"
import { Header } from "../components/shared/Header"

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]); 

  const handleSearch = async (keyword: string) => {
    try {
      const response = await axios.get('http://localhost:5002/search_keyword', {
        params: {
          keyword: keyword,
        },
      });

      setSearchResults(response.data);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log('dataa',searchResults)

  return (
    <>
      <Header /> 
      <NavBar />
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </>
  );
};

export default Search;
