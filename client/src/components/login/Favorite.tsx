import axios from "axios";
import React, { useEffect, useState } from "react";

const Fav = ({ preference}: { preference: any }) => {
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5002/get_fav?list=${preference.q}`);
        const fetchedBooks = response.data; 
       
        setFavoriteBooks(fetchedBooks);
      } catch (error) {
        
        console.error(error);
        throw new Error('Failed to fetch favorite books');
      }
    };

    fetchFavoriteBooks();
  }, [preference]);

  return (
    <div>
      <h3>Favorite Books</h3>
      
    <div>
      <h2>Search Results</h2>
      <ul>
        {favoriteBooks.map((result) => (
          <li key={result.title}>
            <a>
              <div>
                <h3>{result.title}</h3><small>${result.price}</small>
                <h5>{result.author}</h5>
              </div>
              <p>{result.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
};

export default Fav;
