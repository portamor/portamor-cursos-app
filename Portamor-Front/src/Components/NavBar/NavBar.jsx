import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "../StyleSheet/Navbar.module.css";

export const NavBar = () => {
  const hamburguerRef = useRef(null);
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target) &&
        hamburguerRef.current &&
        !hamburguerRef.current.contains(event.target)
      ) {
        hamburguerRef.current.classList.remove("active");
        navMenuRef.current.classList.remove("active");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [hamburguerRef, navMenuRef]);

  const handleHamburguerClick = () => {
    hamburguerRef.current.classList.toggle("active");
    navMenuRef.current.classList.toggle("active");
  };

  return (
    <nav className={Styles["nav-container"]}>
     <ul
        className={`${Styles["nav-menu"]} ${menuOpen ? Styles["active"] : ""}`}
        ref={navMenuRef}
      >
        <img
          src="https://res.cloudinary.com/dsjsbp6qy/image/upload/v1679065705/Dshop/Dise%C3%B1o_sin_t%C3%ADtulo__19_-removebg-preview-removebg-preview_gvpsgd.png"
          alt="logo"
          width={300}
          height={100}
        />
        <ul className={Styles["container-link"]}>
          <li>
            <NavLink
              className={Styles["nav-link"]}
              exact
              to="/"
              activeClassName="active"
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              className={Styles["nav-link"]}
              exact
              to="/cursos"
              activeClassName="active"
            >
              Cursos
            </NavLink>
          </li>
          <li>
            <NavLink
              className={Styles["nav-link"]}
              activeClass="active"
              to=""
            
            >
              Solicitar ayuda
            </NavLink>
          </li>
        </ul>
      </ul>
      <div
        className={`${Styles["hamburguer"]} ${
          menuOpen ? Styles["active"] : ""
        }`}
        ref={hamburguerRef}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={Styles["bar"]}></span>
        <span className={Styles["bar"]}></span>
        <span className={Styles["bar"]}></span>
      </div>
    </nav>
  );
};

export default NavBar;
