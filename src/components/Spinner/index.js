import { Col, Container, Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import styles from "./Custom.module.css";

function SpinnerComponent() {
  return (
    <>
      <Container
       className={styles.ContainerCustom}
      >
        <Row>
          <Col xs={6} md={2}>
            <Spinner animation="border" variant="warning" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SpinnerComponent;
