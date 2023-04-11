import React from "react";
import { Link } from "react-router-dom";
import Styles from "./CourseCard.module.css";

const CourseCard = ({ id, title, image }) => {
  return (
    <Link to={`/detalle-curso/${id}`} className={Styles["button-link"]}>
      <div className={Styles["course-card"]}>
        <img src={image} alt="course-card" />
        <h3>{title}</h3>
        <button className={Styles["card-button"]}>Ver Más</button>
      </div>
    </Link>
  );
};

export default CourseCard;
