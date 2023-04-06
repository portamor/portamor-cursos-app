import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "../StyleSheet/NavFilter.module.css";
import { getCoursesByGenre, getCourses } from "../../Redux/actions";

const NavFilter = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const courses = useSelector((state) => state.courses);


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


  function handleFilterClick(e) {
    if (e === "") {
      dispatch(getCourses());
    } else {
      dispatch(getCoursesByGenre(e));
    }
  }
  function handleSelectChange(event) {
    setSelectedGenre(event.target.value);
    if (event.target.value === "") {
      dispatch(getCourses());
    } else {
      dispatch(getCoursesByGenre(event.target.value));
    }
  }

  return (
    <div className={Styles["filter-container"]}>
      <ul className={Styles["ul-filter"]}>
        <li className={Styles["li-filter"]}>
          <button
            className={Styles["button-filter"]}
            value=""
            onClick={() => handleFilterClick("")}
          >
            Todos
          </button>
        </li>
        <li className={Styles["li-filter"]}>
          <button
            className={Styles["button-filter"]}
            value="Actividad Fisica"
            onClick={() => handleFilterClick("Actividad Fisica")}
          >
            Actividad Física
          </button>
        </li>
        <li className={Styles["li-filter"]}>
          <button
            className={Styles["button-filter"]}
            value="Participacion Social"
            onClick={() => handleFilterClick("Participacion Social")}
          >
            Participación Social
          </button>
        </li>
        <li className={Styles["li-filter"]}>
          <button
            className={Styles["button-filter"]}
            value="Bienestar Mental"
            onClick={() => handleFilterClick("Bienestar Mental")}
          >
            Bienestar Mental
          </button>
        </li>
        <li className={Styles["li-filter"]}>
          <button
            className={Styles["button-filter"]}
            value="Alimentacion Saludable"
            onClick={() => handleFilterClick("Alimentacion Saludable")}
          >
            Alimentación Saludable
          </button>
        </li>
      </ul>

      <div>
        <select
          className={Styles["select-filter"]}
          value={selectedGenre}
          onChange={handleSelectChange}
        >
          <option value="">Todos</option>
          <option value="Actividad Fisica">Actividad Física</option>
          <option value="Participacion Social">Participación Social</option>
          <option value="Bienestar Mental">Bienestar Mental</option>
          <option value="Alimentacion Saludable">Alimentación Saludable</option>
        </select>
      </div>
    </div>
  );
};

export default NavFilter;
