import React, { useState } from "react";
import axios from "axios";

import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoBookOutline, IoBookSharp } from "react-icons/io5";

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

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  const [bookmarkStatus, setBookmarkStatus] = useState({});

  const handleSaveClick = async (bookId: number) => {
    setBookmarkStatus((prevStatus) => ({
      ...prevStatus,
      [bookId]: !prevStatus[bookId], // Toggle bookmark status for the specific card ID
    }));

    try {
      const response = await axios.get(
        "http://localhost:5002/auth/login/success",
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
          const result = await axios.get("http://localhost:5002/save_fav", {
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
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors as needed
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
          {results.length == 0 ? <h1 id="no-result-text">No Results Found.</h1> : ""}
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
                  className="bookmark"
                >
                  {bookmarkStatus[result.temp_id] ? (
                    <IoBookSharp />
                  ) : (
                    <IoBookOutline />
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