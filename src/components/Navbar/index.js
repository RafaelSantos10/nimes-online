import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Logo from "../../assets/img/logo.png";
import LogoNav from "../../assets/img/logoNav.png";
import Icon from "../../assets/img/search.svg";
import { NavLink } from "react-router-dom";
import styles from "./Custom.module.css";
import { GlobalContext } from "../Api/GlobalContext";
import "./Style.css";

function NavbarH() {
  const Global = React.useContext(GlobalContext);
  const [searchAnime, setSearchAnime] = React.useState("");
  const formAnimeName = searchAnime
    .replace(/[^a-zA-Z 0-9]+/gm, "_")
    .replace(/\s+/g, "_")
    .replace(/.Ep[a-zA-Z]+...../gm, "")
    .toLowerCase();

  const navMenu = document.querySelector("#offcanvasNavbar-expand-xll");

  function onSearchAnime(e) {
    e.preventDefault();
    Global.setAnimeNameFormattedSearch(formAnimeName);
    localStorage.setItem("animeSearchName", formAnimeName);
    setSearchAnime("");
    window.open("/result", "_self");
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand>
            <a href="/">
              <img className={styles.navLog} src={Logo} />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xll`} />
          <Navbar.Offcanvas
            className={styles.backNav}
            id={`offcanvasNavbar-expand-xll`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xll`}
            placement="end"
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xll`}>
                <img className={styles.navLogMobile} src={LogoNav} />
              </Offcanvas.Title>
            </Offcanvas.Header>
            <div className={styles.menuMobile}>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink to="/">
                    <li
                      onClick={() => {
                        if (navMenu.classList.contains("show")) {
                          navMenu.classList.remove("show");
                        }
                      }}
                    >
                      Inicio
                    </li>
                  </NavLink>
                  <NavLink to="/filmes">
                    <li
                      onClick={() => {
                        Global.setCategory("filme");
                        localStorage.setItem("localCategory", "filme");
                        if (navMenu.classList.contains("show")) {
                          navMenu.classList.remove("show");
                        }
                      }}
                    >
                      Filmes
                    </li>
                  </NavLink>
                  <NavLink to="/dublados">
                    <li
                      onClick={() => {
                        Global.setCategory("dublado");
                        localStorage.setItem("localCategory", "dublado");
                        if (navMenu.classList.contains("show")) {
                          navMenu.classList.remove("show");
                        }
                      }}
                    >
                      Dublados
                    </li>
                  </NavLink>
                </Nav>
                <Form
                  className={`d-flex ${styles.fixBottom}`}
                  onSubmit={onSearchAnime}
                >
                  <Form.Control
                    type="text"
                    placeholder="Buscar"
                    className={`me-2 `}
                    aria-label="Search"
                    value={searchAnime}
                    onChange={(e) => {
                      setSearchAnime(e.target.value);
                    }}
                  />

                  <Button
                    style={{ border: "none", background: "#FAD82D" }}
                    className="text-white"
                    onClick={onSearchAnime}
                  >
                    <img src={Icon} />
                  </Button>
                </Form>
                <div className={styles.footerText}>
                  <p>Este projeto tem como e SOMENTE o objetivo de ESTUDO.</p>
                </div>
              </Offcanvas.Body>
            </div>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarH;
