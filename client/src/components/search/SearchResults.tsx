import React from 'react';

interface SearchResult {
  title:string;
  author: string;
  pages: number;
  price:number;
  description:string;
  dimensions: string[];

}

interface SearchResultsProps {
  results: SearchResult[];
}


const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {

  console.log("data being sent",results)
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result) => (
          <li key={result.title}>
            <a>
              <div>
                <h5>{result.title}</h5><small>{result.price}</small>
              </div>
              <p>{result.description}</p>
            </a>
          
          </li>

        ))}
      </ul>
    </div>
  );
};

export default SearchResults;

