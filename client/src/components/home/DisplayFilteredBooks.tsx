import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import cfba_json from "../../../../server/outputs/cfba.json";
import placeholder from "../../images/placeholder.png";
import "./module.home.css";

export const DisplayFilteredBooks = () => {
  interface Book {
    title: string;
    author: string | null;
    price: number | null;
    edition: string | null;
    year: number | null | undefined;
    binding: string | null;
    dimensions: string | null;
    pages: number | null;
    materials: string | null;
    description: string;
    reference: string | null;
    images: string[];
    publisher: string | null;
    isbn: string | null;
  }

  const books: Book[] = cfba_json;

  const [yearFilter, setYearFilter] = useState<string>("All");
  const [costFilter, setCostFilter] = useState<number | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  // Apply filtering and sorting to the entire dataset
  const filteredAndSortedBooks = books
    .filter((book) => book.price !== null)
    .filter((book) => {
      if (yearFilter === "All") {
        return true;
      } else if (yearFilter === "2023") {
        return book.year !== null && book.year !== undefined && book.year === 2023;
      } else if (yearFilter === "Past 3 Years") {
        return book.year !== null && book.year !== undefined && (book.year >= 2020 && book.year <= 2023);
      }
      return false;
    });



  const itemsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedBooks.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div>
        <div>
          <label>Filter by Year:</label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="2023">2023</option>
            <option value="Past 3 Years">Past 3 Years</option>
          </select>
        </div>
        <div>
          <label>Filter by Cost:</label>
          <input
            type="number"
            value={costFilter || ''}
            onChange={(e) => setCostFilter(parseInt(e.target.value) || null)}
          />
        </div>
        <div>
          <label>Sort:</label>
          <select onChange={(e) => setIsAscending(e.target.value === 'ascending')}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <ul>
          <Container>
            <Row>
              {currentItems.map((book, index) => (
                <Col key={index} xs={12} sm={6} lg={2} className="product-col">
                  <Card className="product-item">
                    {book.images ? (
                      <Card.Img variant="top" src={book.images[0]} style={{ width: '150px', height: '200px' }} alt="Artwork" />
                    ) : (
                      <img
                        src={placeholder}
                        alt="Placeholder Artwork"
                        style={{ width: '150px', height: '200px' }}
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{book.title} - ${book.price}.00</Card.Title>
                      <Card.Text>Year {book.year}</Card.Text>
                      <Card.Text>{book.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination>
              {Array(Math.ceil(filteredAndSortedBooks.length / itemsPerPage))
                .fill(0)
                .map((_, index) => {
                  const numPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
                  if (numPages <= 10 || (index < 5 || index >= numPages - 5)) {
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
                    return (
                      <Pagination.Ellipsis key="start-ellipsis" />
                    );
                  } else if (index === numPages - 6) {
                    return (
                      <Pagination.Ellipsis key="end-ellipsis" />
                    );
                  }
                  return null;
                })}
            </Pagination>

          </Container>
        </ul>
      </div>
    </div>
  );
};
