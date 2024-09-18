import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import styles from './Custom.module.css'
function Footer() {
  return (
    <>
      <Navbar bg="dark" expand="lg" fixed="bottom">
        <Container fluid style={{display:"flex", flexDirection:"column",position:"relative"}} >
          <div
           className={styles.divMain}
          >
            <div
              className={styles.divSocial}
            >
              <a href="https://www.instagram.com/raffa_snts_/" target="_blank" className={styles.logosSocial} style={{ marginLeft:"5px" }}>
                {<SiInstagram />}
              </a>
              <a href="https://www.linkedin.com/in/rafael-santos-065794293/" target="_blank" className={styles.logosSocial} style={{ margin:"0 .5rem"}}>
                {<SiLinkedin />}
              </a>
              <a href="https://github.com/RafaelSantos1" target="_blank" className={styles.logosSocial} >
                {<SiGithub />}
              </a>
            </div>
            <div>
              {" "}
              <p className={styles.pCopy}>
                Nimes online &copy; 2024
              </p>
            </div>
          </div>
          <div className={styles.footerText}>
          <p>
          Este projeto tem como e SOMENTE o objetivo de ESTUDO.
              </p>
          </div>
        </Container>
       
      </Navbar>
    </>
  );
}

export default Footer;
