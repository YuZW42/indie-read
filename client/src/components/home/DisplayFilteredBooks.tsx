import { useState } from "react";
import { Container, Row, Col, Card, Pagination, Form } from "react-bootstrap";

import cfba_json from "../../../../server/outputs/cfba.json";
import placeholder from "../../images/placeholder.png"

import "./module.home.css";

import { PostButton } from "../shared/PostButton";
import { Link } from "react-router-dom";

import handleTitleClick from "./SaveFav";
import axios from "axios";

import { IoBookOutline, IoBookSharp } from "react-icons/io5";

export const DisplayFilteredBooks = () => {
  // interface Book {
  //   title: string;
  //   author: string | null;
  //   price: number | null;
  //   edition: string | null;
  //   year: number | null | undefined;
  //   binding: string | null;
  //   dimensions: string | null;
  //   pages: number | null;
  //   materials: string | null;
  //   description: string;
  //   reference: string | null;
  //   images: string[];
  //   publisher: string | null;
  //   isbn: string | null;
  // }

  // const books: Book[] = cfba_json;

  const [yearFilter, setYearFilter] = useState<string>("All");
  const [costFilter, setCostFilter] = useState<string>("All");

  // Apply filtering and sorting to the entire dataset
  const filteredAndSortedBooks = cfba_json.filter((book) => {
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
  const handleSaveClick = async (bookId: number) => {
    try {
      const response = await axios.get('http://localhost:5002/auth/login/success', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const user = response.data.user;

        if (user) {
          const result = await axios.get('http://localhost:5002/save_fav', {
            params: {
              id: user.email,
              bookId: bookId,
            },
          });
          console.log(result.data);
          // Handle result.data as needed
        } else {
          console.log('User not logged in');
          // Handle case where user is not logged in
        }
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle errors as needed
    }
  };

  const [bookmark, setBookmark] = useState();
  
  const handleBookmark = () => {
    console.log("bookmark clicked");
  }

  return (
    <div>
      <Container fluid>
        <Form>
          <Container className="filter-container">
            <Row>
              <Col>
                <Form.Group controlId="yearFilter">
                  <Form.Label>Publication Date</Form.Label>
                  <Form.Control
                    as="select"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="2023">2023</option>
                    <option value="Past 3 Years">Past 3 Years</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="costFilter">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    as="select"
                    value={costFilter}
                    onChange={(e) => setCostFilter(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="10">$10</option>
                    <option value="10-25">$10-$25</option>
                    <option value="25-50">$25-$50</option>
                    <option value="50+">Over $50</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Form>

        <Container className="display-artbooks-container">
          <Row>
            {currentItems.map((book) => (
              <Col
                key={book.temp_id}
                xs={12}
                sm={6}
                md={3}
                lg={2}
                className="product-col"
              >
                <Link to={`/details/${book.temp_id}`} target="_blank" className="product-item">
                    {book.title}
                    {book.images ? (
                      <Card.Img
                        variant="top"
                        src={book.images[0]}
                        style={{ width: "100%", height: "200px" }}
                        alt="Artwork"
                      />
                    ) : (
                      <img
                        src={placeholder}
                        alt="Placeholder Artwork"
                        style={{ width: "100", height: "200px" }}
                      />
                    )}
                    <div className="text-muted">
                      <IoBookOutline className="bookmark" onClick={() => handleBookmark}/>
                      ${book.price}.00
                    </div>
                </Link>
              </Col>
            ))}
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
