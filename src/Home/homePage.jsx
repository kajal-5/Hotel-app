import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Home.css';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel  fade activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img className="d-block w-100" src="/Images/Homeimg2.png" alt="First slide"  text="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/Images/Homeimage1.png" alt="First slide"  text="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="/Images/Homeimg3.png" alt="First slide"  text="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;