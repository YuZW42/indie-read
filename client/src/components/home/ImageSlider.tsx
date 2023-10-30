import Carousel from "react-bootstrap/Carousel";
import Slide_One from "../../assets/event_1.jpg"
import Slide_Two from "../../assets/book_1.jpg"
import Slide_Three from "../../assets/book_2.jpg"

function ImageSlider() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}
      >
        <img
          className="d-block w-75 "
          src={Slide_One}
          alt="Image One"
        />
      </Carousel.Item>
      <Carousel.Item interval={1000}
      >
        <img
          className="d-block w-75"
          src={Slide_Two}
          alt="Image Two"
        />
      </Carousel.Item>
      <Carousel.Item 
      >
        <img
          className="d-block w-75"
          src={Slide_Three}
          alt="Image Three"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;
