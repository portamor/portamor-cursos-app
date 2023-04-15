import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "./CourseCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions";

const CourseCard = ({ id, title, image }) => {
  const dispatch = useDispatch();

  const courseUsers = useSelector((state) => state.courseUsers);

  useEffect(() => {
    // dispatch(actions.getUsersByCourseId(id));
  }, [courseUsers, dispatch, id])

  return (
    <Link to={`/detalle-curso/${id}`} className={Styles["button-link"]}>
      <div className={Styles["course-card"]}>
        <img src={image} alt="course-card" />
        <h3>{title}</h3>
        <p>{courseUsers.length} Estudiantes</p>
        <button className={Styles["card-button"]}>Ver Más</button>
      </div>
    </Link>
  );
};

export default CourseCard;
