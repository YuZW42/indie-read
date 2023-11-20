// import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import cfbaJson from "../../../server/outputs/cfba.json";

import { BsArrowLeftCircle } from "react-icons/bs";
import NavBar from "../components/shared/NavBar";

import { Container, Row, Col, Card } from "react-bootstrap";

import "../components/details/module.details.css";

export const DetailsPage = () => {
  const { id } = useParams();

  const filteredAndSortedBooks = cfbaJson.filter((book) => book.id == id);

  // Since filteredAndSortedBooks returns an array, you need to check if it has any elements
  const resultObject =
    filteredAndSortedBooks.length > 0 ? filteredAndSortedBooks[0] : null;

  return (
    <div>
      <div>
        <a href="/"><BsArrowLeftCircle className="back-arrow" /></a>
        <NavBar />
      </div>

      <Container>
        <main className="">
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

              <div>
                <h1>${resultObject.price}.00</h1>
                <h1>{resultObject.author}</h1>

                <ul>
                  <li>{resultObject.dimensions}</li>
                  <li>{resultObject.pages}</li>
                  <li>{resultObject.materials}</li>
                  <li>{resultObject.publisher}</li>
                </ul>
              </div>

              <div>
                <p>{resultObject.description}</p>
              </div>
            </div>
          ) : (
            <p>No object found with ID {id}</p>
          )}
        </main>
      </Container>
    </div>
  );
};
