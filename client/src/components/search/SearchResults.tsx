import { useState } from "react";

import axios from "axios";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
//import { IoBookOutline, IoBookSharp } from "react-icons/io5";

import bmClicked from "../../assets/bookmark_clicked.png"
import bmUnclicked from "../../assets/bookmark_unclicked.png";

// import Spinner from "react-bootstrap/Spinner";

import placeholder from "../../images/placeholder.png";
import cfba_json from "../../../../server/outputs/cfba.json";

import "./module.search.css";
import "../home/module.home.css";

interface SearchResult {
  title: string;
  author: string;
  pages: number;
  price: number;
  temp_id: number;
  images: string[];
}

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
}

interface BookmarkStatus {
  [key: number]: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  // const [bookmarkStatus, setBookmarkStatus] = useState({});

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
              id: user.email,
              bookId: bookId,
            },
          });
          console.log(result.data);
          // Handle result.data as needed
        } else {
          console.log("User not logged in");
          // Handle case where user is not logged in
        }
      } else {
        //throw new Error("Failed to fetch user data");
        const result = await axios.get("https://indie-read-production.up.railway.app/save_fav", {
          params: {
            id: "115640783162715523277",
            bookId: bookId,
          },
        });
        console.log(result)
      }
    } catch (error) {
      const result = await axios.get("https://indie-read-production.up.railway.app/save_fav", {
        params: {
          id: "115640783162715523277",
          bookId: bookId,
        },
      });
      console.log(result)
    }
  };

  const getImageSource = (bookID: number) => {
    for (const book of cfba_json) {
      if (book.temp_id == bookID) {
        return book.images[0];
      }
    }
  };

  return (
    <div className="search-result-container">
      {/* {loading && <Spinner animation="border" variant="primary" />}
      {!loading && results.length === 0 && (
        <p id="no-result-text">No results found.</p>
      )}
      {!loading && results.length > 0 && ( */}
      <Container>
        <h1>{results.length} Artist's Artbooks Found</h1>
        {results.length == 0 ? (
          <h1 id="no-result-text">No Results Found.</h1>
        ) : (
          ""
        )}
        <Row>
          {results.map((result) => (
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
      </Container>
      {/* )} */}
    </div>
  );
};

export default SearchResults;
