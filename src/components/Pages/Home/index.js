import Cards from "../../Cards";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Label from "../../Overlay";
import CardsSlide from "../../CardsSlide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Highlights from "../../Carousel";
import { Col } from "react-bootstrap";
import styles from "./Custom.module.css";

function Home() {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Highlights />
          </Col>
        </Row>
      </Container>
      <Container className={styles.containerTop}>
        <Label text="Recém Atualizados" />
        <Row className={styles.containerLine}>
          <Cards />
        </Row>
      </Container>
      <Container className={styles.containerTop}>
        <Label text="Populares" />
        <Row className={styles.containerLine}>
          <CardsSlide />
        </Row>
      </Container>
    </>
  );
}

export default Home;
