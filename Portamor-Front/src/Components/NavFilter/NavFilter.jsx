import React, { useEffect, useState } from "react";
import Styles from "../StyleSheet/NavFilter.module.css";

const NavFilter = () => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 839);
      }
  
      handleResize();
      window.addEventListener("resize", handleResize);
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);



  return (
    <div className={Styles["filter-container"]}>
      <ul className={Styles["ul-filter"]}>
        <li className={Styles["li-filter"]}>
          <button className={Styles["button-filter"]}>Todos</button>
        </li>
        <li className={Styles["li-filter"]}>
          <button className={Styles["button-filter"]}>Actividad Física</button>
        </li>
        <li className={Styles["li-filter"]}>
          <button className={Styles["button-filter"]}>
            Participación Social
          </button>
        </li>
        <li className={Styles["li-filter"]}>
          <button className={Styles["button-filter"]}>Bienestar Mental</button>
        </li>
        <li className={Styles["li-filter"]}>
          <button className={Styles["button-filter"]}>
            Alimentción Saludable
          </button>
        </li>
      </ul>
      <div>
        <select id="mi-select" className={Styles["select-filter"]}>
          <option value="">Todos</option>
          <option value="Actividad Fisica">Actividad Física</option>
          <option value="Participacion Social">Participación Social</option>
          <option value="Bienestar Mental">Bienestar Mental</option>
          <option value="Alimentacion Saludable">Alimentción Saludable</option>
        </select>
      </div>
    </div>
  );
};

export default NavFilter;
