import React from 'react';

interface SearchResult {
  title:string;
  author: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}


const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {

  console.log("show",results)
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.title}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

