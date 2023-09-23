import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions"
import Paginated from "../Paginated/Paginated";
import styles from "./MyCourses.module.css";

const MyCourses = () => {
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(actions.resetPaginated())
    dispatch(actions.getCoursesOfUser(userFromLocalStorage.id));
  }, [dispatch, userFromLocalStorage.id])

  return (
    <div className={styles["my-courses-main"]}>
      <Paginated /> 
    </div>
  );
};

export default MyCourses;