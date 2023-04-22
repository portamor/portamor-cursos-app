import React from 'react'
import logoPortamor from "../../images/LogoRed.svg"
import styles from "./Footer.module.css"
import {Facebook, Instagram, Linkedin, Youtube} from "react-bootstrap-icons"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className={styles["footer-main"]}>
      <div className={styles["footer-container"]}>
        <div className={styles["img-message-container"]}>
          <img src={logoPortamor} alt="footer-logo" className={styles["footer-img"]}/>
          <p>"Fortalecemos el amor así mismo, el acompañamiento familiar e intervención en el logro de un envejecimiento activo"</p>
        </div>
        <div>
          <h3>Contactenos</h3>
          <p>+51 966 134 424</p>
          <p>portamor.pe@gmail.com</p>
          <div className={styles["icons-container"]}>
            <Link to={"https://www.facebook.com/Portamor.pe?_rdc=2&_rdr"}>
              <Facebook  size={"30px"} color='#eb575a' />
            </Link>
            <Link to={"https://www.instagram.com/portamor.pe/"} >
              <Instagram size={"30px"} color='#eb575a'/>
            </Link>
            <Link to={"https://www.linkedin.com/company/portamor/?original_referer=https%3A%2F%2Fcurso.portamor.com.pe%2F"} >
              <Linkedin  size={"30px"} color='#eb575a'/>
            </Link>
            <Link to={"https://www.youtube.com/channel/UCielphaqcV3Wv79t80hJ-wg"} >
              <Youtube   size={"30px"} color='#eb575a'/>
            </Link>
          </div>
        </div>
      </div>
      <p>Copyright © 2023 All Rights Reserved Portamor</p>
    </div>
  )
}

export default Footer