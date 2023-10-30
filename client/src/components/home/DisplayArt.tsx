import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import products from '../../../../server/outputs/products.json';

export const DisplayArtwork = () => {
  interface ProductInfo {
    title: string;
    cost: string;
    desc: string;
    link: string;
    img_url: string;
  }

  const data: ProductInfo[] = products;
  const itemsPerPage = 15;

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const getFirst30Words = (text: string) => {
  //   const words = text.split(' ');
  //   return words.slice(0, 30).join(' ') + "...";
  // };

  return (
    <Container>
      <h1>Artworks:</h1>
      <Row>
        {currentItems.map((product, index) => (
          <Col key={index} xs={12} sm={6} lg={2} className="product-col">
            <Card className="product-item">
              <Card.Img variant="top" src={product.img_url} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Cost: {product.cost}</Card.Text>
                <Card.Link href={product.link}>Artwork Link</Card.Link>
                <Card.Text>Description: {product.desc}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination>
        {Array(Math.ceil(data.length / itemsPerPage))
          .fill(0)
          .map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
      </Pagination>
    </Container>
  );
};
