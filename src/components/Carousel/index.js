import Carousel from "react-bootstrap/Carousel";
import { Ratio } from "react-bootstrap";
import image1 from "../../assets/img/01.jpg"
import image2 from "../../assets/img/02.png"
import image3 from "../../assets/img/03.jpg"
import styles from "./Custom.module.css"

function Highlights() {
  return (
    <Carousel indicators={false} fade controls={false} className={styles.carouselCustom}>
      <Carousel.Item interval={3500}>
        <Ratio aspectRatio="21x9">
          <img
          
            className={`${styles.carouselImgCustom } d-block w-100`}
            src={image1}
            alt="First slide"
          />
        </Ratio>
       
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <Ratio aspectRatio="21x9">
          <img
            className={`${styles.carouselImgCustom } d-block w-100`}
            src={image2}
            alt="Second slide"
          />
        </Ratio>
       
      </Carousel.Item>
      <Carousel.Item interval={3500}>
        <Ratio aspectRatio="21x9">
          <img
            className={`${styles.carouselImgCustom } d-block w-100`}
            src={image3}
            alt="Third slide"
          />
        </Ratio>
        
      </Carousel.Item>
    </Carousel>
  );
}

export default Highlights;
