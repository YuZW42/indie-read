import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";

import cfbaJson from "../../../server/outputs/cfba.json";

// import bmClicked from "../assets/bookmark_clicked.png";
import bmUnclicked from "../assets/bookmark_unclicked.png";
import purchasedBtn from "../assets/Purchase.png";

import axios from "axios";

import "../components/details/module.details.css";

export const DetailsPage = () => {
  const { id } = useParams();
  let pageID = -1;

  const filteredAndSortedBooks = cfbaJson.filter((book) => {
    pageID = book.temp_id;
    return String(book.temp_id) == id
  });
  //cast tempid to string

  const resultObject =
    filteredAndSortedBooks.length > 0 ? filteredAndSortedBooks[0] : null;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // const isScrollable = resultObject.images.length > 4 ? true : false;

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

  return (
    <>
      <Container>
        <Header />

        <main className="mt-3">
          {resultObject ? (
            <div>
              <h1 className="card-title">{resultObject.title}</h1>
              <Row className="flex-nowrap overflow-auto">
                {resultObject.images.map((imageUrl, index) => (
                  <Col key={index} xs={6} md={4} lg={3}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={imageUrl}
                        alt={`Image ${index}`}
                        className="img-fluid rounded"
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
              {/* {isScrollable && <p className="scroll-info">Scrollable</p>} */}
              <div className="mt-3">
                <div className="top-level-info">
                  <div className="artbook-info">
                    <p id="price">${resultObject.price}.00</p>
                    <p id="author">
                      {resultObject.author
                        ? resultObject.author
                        : "Author Not Found"}
                    </p>
                  </div>

                  <div className="btn-container">
                    <div
                      onClick={() => handleSaveClick(pageID)}
                      className="bookmark"
                    >
                      <img src={bmUnclicked} alt="bookmark button clicked" />

                      {/* {bookmarkStatus[id] ? (
                        <img src={bmUnclicked} alt="bookmark button clicked" />
                      ) : (
                        <img
                          src={bmUnclicked}
                          alt="bookmark button not clicked"
                        />
                      )} */}
                    </div>

                    <a href={resultObject.url} target="_blank">
                      <img
                        src={purchasedBtn}
                        alt="button to purchase art book"
                      />
                    </a>
                  </div>
                </div>

                <ul className="bottom-level-info">
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
                <p id="description">
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
              {/* {resultObject.url && (
                <button className="see-artbook-btn">
                  <a href={resultObject.url} target="_blank">
                    See Art Book
                  </a>
                </button>
              )}{" "} */}
            </div>
          ) : (
            <p>No object found with ID {id}</p>
          )}
        </main>
      </Container>

      <Footer />
    </>
  );
};
