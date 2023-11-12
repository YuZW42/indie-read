import  { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import products from "../../../../server/outputs/products.json";

// import Modal from "react-bootstrap/Modal";

import "./module.home.css"

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

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const getFirst30Words = (text: string) => {
  //   const words = text.split(' ');
  //   return words.slice(0, 30).join(' ') + "...";
  // };

  return (
    <Container>
      <h1 id="artwork-title">Artworks:</h1>
      <Row>
        {currentItems.map((product, index) => (
          <Col key={index} xs={12} md={6} sm={4} lg={2} className="product-col">
            <Card className="product-item">
              <Card.Img variant="top" src={product.img_url} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Cost: {product.cost}</Card.Text>
                <Card.Link href={product.link}>Artwork Link</Card.Link>
                <Card.Text>Description: {product.desc}</Card.Text>
              </Card.Body>
            </Card>

            {/* <Modal show={show} onHide={handleClose} className="modal-backdrop">
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quaerat perferendis nam minima iusto laudantium maiores dolores explicabo ut aspernatur obcaecati labore, fugiat est excepturi?
              </Modal.Body>
            </Modal> */}

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
