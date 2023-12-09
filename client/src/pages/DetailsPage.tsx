import  { useState } from "react";
import { useParams } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavBar from "../components/shared/NavBar";
import cfbaJson from "../../../server/outputs/cfba.json";
import "../components/details/module.details.css";

export const DetailsPage = () => {
  const { id } = useParams();
  const filteredAndSortedBooks = cfbaJson.filter((book) => book.temp_id == id);
  const resultObject =
    filteredAndSortedBooks.length > 0 ? filteredAndSortedBooks[0] : null;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <a href="/">
            <BsArrowLeftCircle className="back-arrow" />
          </a>
        </Col>
        <Col>
          <NavBar />
        </Col>
      </Row>

      <main className="mt-3">
        {resultObject ? (
          <div>
            <h1 className="card-title">{resultObject.title}</h1>
            <hr className="divider" />
            <Row>
              {resultObject.images.map((imageUrl, index) => (
                <Col key={index} xs={6} md={4} lg={3}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt={`Image ${index}`}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="mt-3">
              <h1>${resultObject.price}.00</h1>
              <h1>{resultObject.author}</h1>

              <ul>
                {resultObject.dimensions && (
                  <li>Dimensions: {resultObject.dimensions}</li>
                )}
                {resultObject.pages && <li>Pages: {resultObject.pages}</li>}
                {resultObject.materials && (
                  <li>Materials: {resultObject.materials}</li>
                )}
                {resultObject.publisher && (
                  <li>Publisher: {resultObject.publisher}</li>
                )}
              </ul>
            </div>
            <div className="mt-3">
              <p>
                {showFullDescription
                  ? resultObject.description
                  : resultObject.description.slice(0, 1800)}
                {resultObject.description.length > 1800 &&
                  !showFullDescription && (
                    <Button variant="link" onClick={toggleDescription}>
                      See More
                    </Button>
                  )}
                {resultObject.description.length > 1800 &&
                  showFullDescription && (
                    <Button variant="link" onClick={toggleDescription}>
                      See Less
                    </Button>
                  )}
              </p>
            </div>
            {resultObject.url && (
                <Button className="primary">
                <a href={resultObject.url} target="_blank" style={{ color: 'white' }}>
                  See Art Book
                </a>
              </Button>
            )}{" "}
          </div>
        ) : (
          <p>No object found with ID {id}</p>
        )}
      </main>
    </Container>
  );
};
