import React       from "react";
import {NavLink}   from "react-router-dom";
import {useEffect} from "react";
import {useRef}    from "react";
import {useState}  from "react";
import Styles      from "./Navbar.module.css";

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
    <nav className={`${Styles["nav-container"]} ${menuOpen ? Styles["active"] : ""}`}>
      <img
        src="https://res.cloudinary.com/dsjsbp6qy/image/upload/v1679065705/Dshop/Dise%C3%B1o_sin_t%C3%ADtulo__19_-removebg-preview-removebg-preview_gvpsgd.png"
        alt="logo"
        width={200}
        height={60}
      />
      <div
        className={`${Styles["nav-menu"]} ${menuOpen ? Styles["active"] : ""}`}
        ref={navMenuRef} > 
        <NavLink
          className={Styles["nav-link"]}
          exact
          to="/"
          activeClassName="active" >
          Inicio
        </NavLink>
        <NavLink
          className={Styles["nav-link"]}
          exact
          to="/cursos"
          activeClassName="active" >
          Mis cursos
        </NavLink>

        {isMobile && (
          <button
            className={Styles["button-salirMenu"]}
            onClick={handleHamburguerClick}
          >
            Salir del Menú
          </button>
        )}
      </div>

      {isMobile && (
        <button
          // className={Styles["mobile-menu-button"]}
          className={`${Styles["mobile-menu-button"]} ${menuOpen ? Styles["active"] : ""}`}
          onClick={handleMenuClick} >
          Menú
        </button>
      )}
    </nav>
  );
};

export default NavBar;
