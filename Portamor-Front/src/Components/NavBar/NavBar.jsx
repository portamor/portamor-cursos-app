import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Styles from "../StyleSheet/Navbar.module.css";

export const NavBar = () => {
  const hamburguerRef = useRef(null);
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 975);
    handleResize(); // Llamamos al handler para que se ejecute al inicio
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleHamburguerClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
      if (hamburguerRef.current && navMenuRef.current) {
        hamburguerRef.current.classList.remove("active");
        navMenuRef.current.classList.remove("active");
      }
    } else {
      setMenuOpen(true);
      if (hamburguerRef.current && navMenuRef.current) {
        hamburguerRef.current.classList.add("active");
        navMenuRef.current.classList.add("active");
      }
    }
  };
  
  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
    navMenuRef.current.classList.toggle("active");
  };
  

  return (
    <nav className={Styles["nav-container"]}>
      <img
        src="https://res.cloudinary.com/dsjsbp6qy/image/upload/v1679065705/Dshop/Dise%C3%B1o_sin_t%C3%ADtulo__19_-removebg-preview-removebg-preview_gvpsgd.png"
        alt="logo"
        width={300}
        height={100}
      />
      <ul
        className={`${Styles["nav-menu"]} ${menuOpen ? Styles["active"] : ""}`}
        ref={navMenuRef}
      >
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
            <NavLink  activeClassName="active" className={Styles["nav-link"]} to="">
              Solicitar ayuda
            </NavLink>
          </li>
          {isMobile && (
            <button
              className={Styles["button-salirMenu"]}
              onClick={handleHamburguerClick}
            >
              Salir del Menú
            </button>
          )}
        </ul>
      </ul>
     {isMobile && (
      <div className={Styles["mobile-menu"]}>
        <button className={Styles["mobile-menu-button"]} onClick={handleMenuClick}>
          Menú
        </button>
      </div>
    )}

      <div></div>
    </nav>
  );
};

export default NavBar;
