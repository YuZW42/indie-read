import axios from "axios";
import { useEffect, useState } from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import cfba_json from "../../../../server/outputs/cfba.json";
import placeholder from "../../images/placeholder.png";

import bmClicked from "../../assets/bookmark_clicked.png"
import bmUnclicked from "../../assets/bookmark_unclicked.png"

interface BookmarkStatus {
  [key: number]: boolean;
}

const Fav = ({ preference }: { preference: any }) => {
  const [favoriteBooks, setFavoriteBooks] = useState<any[]>([]);

  const [bookmarkStatus, setBookmarkStatus] = useState<BookmarkStatus>({});
  
  const handleSaveClick = async (bookId: number): Promise<void> => {    
    setBookmarkStatus((prevStatus) => ({
      ...prevStatus,
      [bookId]: !prevStatus[bookId],
    })); 

    setTimeout(() => {
      setBookmarkStatus((prevStatus) => ({
        ...prevStatus,
        [bookId]: !prevStatus[bookId],
      }));
    }, 1500);

    try {
      const response = await axios.get(
        "https://indie-read-production.up.railway.app/auth/login/success",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data.user;

        if (user) {
          const result = await axios.get("https://indie-read-production.up.railway.app/save_fav", {
            params: {
              id: 115640783162715523277,
              bookId: bookId,
            },
          });
          console.log(result.data);
          
        } else {
          console.log("User not logged in");
         
        }
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error);
      
    }
  };

  const getImageSource = (bookID: number) => {
    for (const book of cfba_json) {
      if (book.temp_id == bookID) {
        return book.images[0];
      }
    }
  };



  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {

        const response = await axios.get(`https://indie-read-production.up.railway.app/get_fav?list=${preference.q}`);
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

      <div className="fav-books-container">
        {/* <h2>Search Results</h2> */}
        {/* <h1>{favoriteBooks.length} Artist's Artbooks Found</h1> */}

        <Container>
          {favoriteBooks.length == 0 ? <h1 id="no-result-text">No Bookmarked Artbooks Found.</h1> : ""}
          <Row>
            <Col xs={12} md={2}>
              <button id="collections-btn">My Collections</button>
              <button id="posts-btn">My Posts</button>
            </Col>

            <Col>
              <Row>
                {favoriteBooks.map((result) => (
                  <Col
                    key={result.temp_id}
                    className="product-col"
                    xs={12}
                    sm={6}
                    md={3}
                    style={{
                      padding: "1em",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link
                      to={`/details/${result.temp_id}`}
                      target="_blank"
                      className="product-item"
                      style={{ flex: 1 }}
                    >
                      <div className="book-title">{result.title}</div>
                      {result.images ? (
                        <Card.Img
                          variant="top"
                          src={getImageSource(result.temp_id)}
                          className="book-image"
                          style={{ aspectRatio: "auto" }}
                          alt="Artwork"
                        />
                      ) : (
                        <img
                          src={placeholder}
                          alt="Placeholder Artbook Image"
                          style={{ width: "100%", height: "100%" }}
                        />
                      )}
                      <div className="card-footer">
                        <div className="card-info">
                          <span>
                            {result.author ? result.author : "Author Not Found"}
                          </span>
                          <span id="divider">-</span>
                          <span>
                            {result.price
                              ? "$" + result.price + ".00"
                              : "Price Not Found"}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => handleSaveClick(result.temp_id)}
                      className={`bookmark ${bookmarkStatus[result.temp_id] ? 'fade-out' : ''}`}
                      >
                      {bookmarkStatus[result.temp_id] ? (
                        <img src={bmClicked} alt="bookmark button clicked" />
                      ) : (
                        <img src={bmUnclicked} alt="bookmark button not clicked" />
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Fav;
