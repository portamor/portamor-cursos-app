import { logout } from "../../Redux/actions";
import { loginSuccess } from "../../Redux/actions";
import Modal from "../Modal/Modal";
import { NavLink } from "react-router-dom";
import React from "react";
import Styles from "./Navbar.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import adultoMayorLogo from "../../images/adulto-mayor-logo.svg"
import redLogo from "../../images/LogoRed.svg"
import { useSelector } from "react-redux";

export const NavBar = () => {
  const hamburguerRef = useRef(null);
  const navMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);
  const isAdmin = user?.admin;
  const name = user?.name

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
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout());
    window.history.pushState(null, null, '/');
    window.location.reload();
  };


  const handleLoginButtonClick = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const handleRegisterButtonClick = () => setShowModal(false);

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
  }

  return (
    <nav className={`${Styles["nav-container"]} ${menuOpen ? Styles["active"] : ""}`}>
      <img
        src={adultoMayorLogo}
        alt="adultomayor-header"
        width={200}
        height={60}
        className={Styles["adulto-mayor-img"]}
      />
      <NavLink
        to="/"
        activeclassname="active" >
          <img
            src={redLogo}
            alt="logo-red-header"
            className={Styles["logo-red-header"]}
          />
        </NavLink>
      <div
        className={`${Styles["nav-menu"]} ${menuOpen ? Styles["active"] : ""}`}
        ref={navMenuRef} >
        <NavLink
          className={Styles["nav-link"]}
          to="/"
          activeclassname="active" >
          Inicio
        </NavLink>
        <NavLink
          className={Styles["nav-link"]}
          to="/cursos"
          activeclassname="active" >
          Mis cursos
        </NavLink>
        {isAdmin && (
          <NavLink
            className={Styles["nav-link"]}
            to="/dashboard"
            activeclassname="active"
          >
            Admin
          </NavLink>
        )}

        {isLoggedIn ? (
          <span onClick={handleLogout} className={Styles["nav-link"]}>Cerrar sesión</span>
        )
          :
          <span onClick={() => setShowModal(true)} className={Styles["nav-link"]}>Iniciar sesión</span>
        }
          {name && (
            <span title={`Tu codigo es ${user.code}`} className={Styles["nav-hello"]} >Bienvenido {name}</span>
          )}

        {showModal && (
          <Modal onClose={handleCloseModal} onRegister={handleRegisterButtonClick} onLogin={handleLoginButtonClick}>
          </Modal>
        )}




        {isMobile && (
          <span
          className={Styles["nav-link"]}
            onClick={handleHamburguerClick}
          >
            Salir del Menú
          </span>
        )}
      </div>

      {isMobile && !menuOpen && (
        <span
        className={Styles["nav-link"]}
          onClick={handleMenuClick} >
          Menú
        </span>
      )}
    </nav>
  );
};

export default NavBar;