import React from "react";
import { Link } from "react-router-dom";
import Styles from "../StyleSheet/CourseCard.module.css";

const CourseCard = ({ id, title, image }) => {
  return (
    <div className={Styles["course-container"]}>
      <div className={Styles["course-card"]}>
        <img src={image} height={200} width={399} alt="Curso" />

        <h3>{title}</h3>
        <Link to={`/detalle-curso/${id}`} className={Styles["button-link"]}>
          <button className={Styles["card-button"]}>Ver Más ✓</button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
