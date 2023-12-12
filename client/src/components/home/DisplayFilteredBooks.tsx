import { useState } from "react";
import { Container, Row, Col, Card, Pagination, Form } from "react-bootstrap";

import cfba_json from "../../../../server/outputs/cfba.json";
import placeholder from "../../images/placeholder.png";
import { PostButton } from "../shared/PostButton";
import { Link } from "react-router-dom";
import Search from "../../pages/Search";

import "./module.home.css";

// import handleTitleClick from "./SaveFav";
import axios from "axios";

import bmClicked from "../../assets/bookmark_clicked.png"
// import bmUnclicked from "../../assets/bookmark_unclicked.png"

export const DisplayFilteredBooks = () => {
  interface Book {
    title: string;
    author: string | null;
    price: number | null;
    year: number | null;
    description: string | null;
    images: string[] | null;
    temp_id: number;

    // dimensions: string | null;
    // isbn: string | null;
    // binding: string;
    // pages: number;
    // materials: string ;
    // reference: string
    // publisher: string;
  }

  const books: Book[] = cfba_json;

  const [yearFilter, setYearFilter] = useState<string>("All");
  const [costFilter, setCostFilter] = useState<string>("All");
  // const [formatFilter, setFormatFilter] = useState<string>("All"); // not being used ... yet


  // Apply filtering and sorting to the entire dataset
  const filteredAndSortedBooks = books.filter((book) => {
    return (
      book.price !== null && // Check for non-null prices
      (yearFilter === "All" || // Year filter conditions
        ((yearFilter === "2023" || yearFilter === "Past 3 Years") &&
          typeof book.year === "number" &&
          (yearFilter === "2023" ||
            (book.year >= 2020 && book.year <= 2023)))) &&
      (costFilter === "All" || // Cost filter conditions
        (costFilter === "10" && book.price === 10) ||
        (costFilter === "10-25" && book.price >= 10 && book.price <= 25) ||
        (costFilter === "25-50" && book.price > 25 && book.price <= 50) ||
        (costFilter === "50+" && book.price > 50))
    );
  });

  const handleClear = () => {
    console.log("cleared all filters")

    setCostFilter("All")
    setYearFilter("All")
  }

  const itemsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedBooks.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  /*
    const handleSaveClick = async (bookId:number) => {
      const { handleClick } = handleTitleClick(bookId); // Avoid using hooks conditionally or inside loops
  
      await handleClick(bookId); // Invoking handleClick method
    };*/

  // const [bookmarkStatus, setBookmarkStatus] = useState({});

  const handleSaveClick = async (bookId: number) => {
    
    // setBookmarkStatus((prevStatus) => ({
    //   ...prevStatus,
    //   [bookId]: !prevStatus[bookId], // Toggle bookmark status for the specific card ID
    // })); 

    try {
      const response = await axios.get(
        "https://indie-read-yuzw42.vercel.app/auth/login/success",
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
          const result = await axios.get("https://indie-read-yuzw42.vercel.app/save_fav", {
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

  const getCostLabel = () => {
    switch (costFilter) {
      case "All":
        return "All";
      case "10":
        return "$10";
      case "10-25":
        return "$10-$25";
      case "25-50":
        return "$25-$50";
      case "50+":
        return "Over $50";
      default:
        return "Price";
    }
  };

  const getDateLabel = () => {
    switch (yearFilter) {
      case "All":
        return "All";
      case "2023":
        return "2023";
      case "Past 3 Years":
        return "Past 3 Years";
      default:
        return "Date";
    }
  };

  const getFormatLabel = () => {
    switch (costFilter) {
      case "Book":
        return "Book";
      case "Zine":
        return "Zine";
      case "Emphemera":
        return "Emphemera";
      default:
        return "Format";
    }
  };

  return (
    <div>
      <Search />

      <Container fluid>
        <Container
          className="display-artbooks-container"
        >
          <Row className="artwork-row">
            <Col xs={12} md={2}>
              <button 
                className="clear-filter-btn" 
                onClick={() => handleClear()}
              >
                  Clear Filter
              </button>

              <div className="filter-option">
              <Form.Group
                controlId="costFilter"
                className="dropdown-group"
              >
                <Form.Control
                  as="select"
                  value={costFilter}
                  onChange={(e) => setCostFilter(e.target.value)}
                  className="form-control"
                >
                  <option value="All">All</option>
                  <option value="10">$10</option>
                  <option value="10-25">$10-$25</option>
                  <option value="25-50">$25-$50</option>
                  <option value="50+">Over $50</option>
                </Form.Control>
                <Form.Label>{getCostLabel()}</Form.Label>
              </Form.Group>

              <Form.Group className="dropdown-group">
                <Form.Control
                  as="select"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="form-control"
                >
                  <option value="All">All</option>
                  <option value="2023">2023</option>
                  <option value="Past 3 Years">Past 3 Years</option>
                </Form.Control>
                <Form.Label>{getDateLabel()}</Form.Label>
              </Form.Group>

              <Form.Group
                controlId="costFilter"
                className="dropdown-group"
              >
                <Form.Control
                  as="select"
                  // value={formatFilter}
                  className="form-control"
                >
                  <option value="book">Book</option>
                  <option value="zine">Zine</option>
                  <option value="emphemera">Emphemera</option>
                </Form.Control>
                <Form.Label>{getFormatLabel()}</Form.Label>
              </Form.Group>
              </div>
            </Col>

            <Col xs={12} md={10}>
              <Row>
                {currentItems.map((book) => (
                  <Col
                    key={book.temp_id}
                    className="product-col"
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{
                      padding: "1em",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Link
                      to={`/details/${book.temp_id}`}
                      target="_blank"
                      className="product-item"
                      style={{ flex: 1 }}
                    >
                      <div className="book-title">{book.title}</div>
                      {book.images ? (
                        <Card.Img
                          variant="top"
                          src={book.images[0]}
                          className="book-image"
                          style={{ aspectRatio: "auto" }}
                          alt="Artwork"
                        />
                      ) : (
                        <img
                          src={placeholder}
                          alt="Placeholder Artwork"
                          style={{ width: "100", height: "200px" }}
                        />
                      )}
                      <div className="card-footer">
                        <div className="card-info">
                          <span>{book.author ? book.author : "No Author"}</span>
                          <span id="divider">-</span>
                          <span>
                            {"$" + (book.price ? book.price + ".00" : "No Price")}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => handleSaveClick(book.temp_id)}
                      className="bookmark"
                    >
                      <img src={bmClicked} alt="" />
                      {/* {bookmarkStatus[book.temp_id] ? (
                        <img src={bmClicked} alt="bookmark button clicked" />
                      ) : (
                        <img src={bmUnclicked} alt="bookmark button not clicked" />
                      )} */}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <PostButton />

          <div className="pagination-container">
            <Pagination>
              {Array(Math.ceil(filteredAndSortedBooks.length / itemsPerPage))
                .fill(0)
                .map((_, index) => {
                  const numPages = Math.ceil(
                    filteredAndSortedBooks.length / itemsPerPage
                  );
                  if (numPages <= 10 || index < 5 || index >= numPages - 5) {
                    return (
                      <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    );
                  } else if (index === 5) {
                    return <Pagination.Ellipsis key="start-ellipsis" />;
                  } else if (index === numPages - 6) {
                    return <Pagination.Ellipsis key="end-ellipsis" />;
                  }
                  return null;
                })}
            </Pagination>
          </div>
        </Container>
      </Container>
    </div>
  );
};
