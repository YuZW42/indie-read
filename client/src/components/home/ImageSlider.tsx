import Carousel from "react-bootstrap/Carousel";
import Slide_One from "../../assets/event_1.jpg"
import Slide_Two from "../../assets/book_1.jpg"
import Slide_Three from "../../assets/book_2.jpg"

import "./module.home.css"

function ImageSlider() {
  return (
    <Carousel data-bs-theme="dark" className="carousel-container">
      <Carousel.Item interval={5000}>
        <div className="carousel item1">
          <img
            className="carousel-img"
            src={Slide_One}
            alt="Image One"
          />
          <div>
            <p className="carousel-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, animi! Eos, eius fugit? 
              Alias ratione veniam laudantium error nam officia aut dolorum exercitationem consectetur deleniti 
              quo, omnis dicta voluptatem voluptates molestiae debitis assumenda sequi autem. Nisi, voluptates 
              ipsam pariatur veniam eos omnis saepe officiis nulla adipisci obcaecati autem nihil beatae architecto 
              sit neque quod. Rerum cum deleniti ullam amet distinctio iusto unde illum? Fugit blanditiis nihil ipsa 
              exercitationem. Sed soluta quas sint repudiandae aperiam? Accusantium, sequi ea eos commodi ratione id 
              alias ex esse! Iste repudiandae quidem distinctio perspiciatis nesciunt aliquam, et consectetur? 
              Maiores, repellat dicta delectus velit commodi aliquid?
            </p>
            <p className="mobile-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates accusantium, voluptate reiciendis 
              iste incidunt vel facere, porro velit, consectetur laudantium error quasi maxime perferendis modi molestias 
              dicta sapiente. Voluptate, ipsam. At, voluptatum adipisci quam doloremque, maiores nam itaque ullam labore 
              ratione iure eligendi magni voluptate natus aliquam fugit assumenda corrupti?
            </p>
          </div>
        </div>

      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <div className="carousel item2">
          <img
            className="carousel-img"
            src={Slide_Two}
            alt="Image Two"
          />
          <div>
            <p className="carousel-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, animi! Eos, eius fugit? 
              Alias ratione veniam laudantium error nam officia aut dolorum exercitationem consectetur deleniti 
              quo, omnis dicta voluptatem voluptates molestiae debitis assumenda sequi autem. Nisi, voluptates 
              ipsam pariatur veniam eos omnis saepe officiis nulla adipisci obcaecati autem nihil beatae architecto 
              sit neque quod. Rerum cum deleniti ullam amet distinctio iusto unde illum? Fugit blanditiis nihil ipsa 
              exercitationem. Sed soluta quas sint repudiandae aperiam? Accusantium, sequi ea eos commodi ratione id 
              alias ex esse! Iste repudiandae quidem distinctio perspiciatis nesciunt aliquam, et consectetur? 
              Maiores, repellat dicta delectus velit commodi aliquid?
            </p>
            <p className="mobile-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates accusantium, voluptate reiciendis 
              iste incidunt vel facere, porro velit, consectetur laudantium error quasi maxime perferendis modi molestias 
              dicta sapiente. Voluptate, ipsam. At, voluptatum adipisci quam doloremque, maiores nam itaque ullam labore 
              ratione iure eligendi magni voluptate natus aliquam fugit assumenda corrupti?
            </p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <div className="carousel item3">
          <img
            className="carousel-img"
            src={Slide_Three}
            alt="Image Three"
          />
          <div>
            <p className="carousel-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, animi! Eos, eius fugit? 
              Alias ratione veniam laudantium error nam officia aut dolorum exercitationem consectetur deleniti 
              quo, omnis dicta voluptatem voluptates molestiae debitis assumenda sequi autem. Nisi, voluptates 
              ipsam pariatur veniam eos omnis saepe officiis nulla adipisci obcaecati autem nihil beatae architecto 
              sit neque quod. Rerum cum deleniti ullam amet distinctio iusto unde illum? Fugit blanditiis nihil ipsa 
              exercitationem. Sed soluta quas sint repudiandae aperiam? Accusantium, sequi ea eos commodi ratione id 
              alias ex esse! Iste repudiandae quidem distinctio perspiciatis nesciunt aliquam, et consectetur? 
              Maiores, repellat dicta delectus velit commodi aliquid?
            </p>
            <p className="mobile-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates accusantium, voluptate reiciendis 
              iste incidunt vel facere, porro velit, consectetur laudantium error quasi maxime perferendis modi molestias 
              dicta sapiente. Voluptate, ipsam. At, voluptatum adipisci quam doloremque, maiores nam itaque ullam labore 
              ratione iure eligendi magni voluptate natus aliquam fugit assumenda corrupti?
            </p>
          </div>
        </div>

      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;
