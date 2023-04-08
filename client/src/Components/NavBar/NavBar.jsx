import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Styles from "../StyleSheet/Navbar.module.css";
import { Link } from "react-router-dom";
import { logout, loginSuccess } from "../../Redux/actions";
import Modal from "../Modal/Modal";

export const NavBar = () => {
  const hamburguerRef = useRef(null);
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const isLoggedInInLocalStorage = localStorage.getItem("isLoggedIn");
    if (isLoggedInInLocalStorage === "true") {
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        try {
          const parsedUser = JSON.parse(userFromLocalStorage);
          dispatch(loginSuccess(parsedUser));
        } catch (e) {
          console.error("Error parsing user from local storage:", e);
        }
      }
    }
  }, []);
  

  const handleLogout = () => {
    dispatch(logout());
    return window.location.replace("/");
  };

  const handleLoginButtonClick = () => {
    console.log("User clicked login button.");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRegisterButtonClick = () => {
    console.log("User clicked register button.");
    setShowModal(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 975);
    handleResize();
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
            <Link
              className={Styles["nav-link"]}
              exact
              to="/"
              activeClassName="active"
            >
              Inicio
            </Link>
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
              activeClassName="active"
              className={Styles["nav-link"]}
              to=""
            >
              Solicitar ayuda
            </NavLink>
          </li>
  {isLoggedIn ? (
  <li className={Styles["container-link-ico"]}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/5509/5509651.png"
      alt="cerrar sesion"
      width={40}
      height={40}
      onClick={handleLogout}
    />
    <span>Cerrar sesión</span>
  </li>
) : (
  <li className={Styles["container-link-ico"]}>
    <img
      src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
      alt="iniciar sesion"
      width={40}
      height={40}
      onClick={() => setShowModal(true)}
    />
    <span >Iniciar sesión</span>
  </li>
)}
     {showModal && (
          <Modal onClose={handleCloseModal} onRegister={handleRegisterButtonClick} onLogin={handleLoginButtonClick}>
          </Modal>
        )}
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
          <button
            className={Styles["mobile-menu-button"]}
            onClick={handleMenuClick}
          >
            Menú
          </button>
        </div>
      )}

      <div></div>
    </nav>
  );
};

export default NavBar;