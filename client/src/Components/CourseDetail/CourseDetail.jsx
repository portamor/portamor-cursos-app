import * as actions from "../../Redux/actions";
import Modal        from "../Modal/Modal";
import { NavLink }  from "react-router-dom";
import React        from 'react';
import RegisterUser from "../RegisterUser/RegisterUser"
import styles       from "./CourseDetail.module.css"
import { useState } from 'react';
import {useEffect}  from 'react';
import { useMatch } from "react-router-dom";
import {useDispatch}from "react-redux";
import {useSelector}from "react-redux";

export const CourseDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const isLoggedInInLocalStorage  = localStorage.getItem("isLoggedIn");

  const dispatch = useDispatch();
  const match    = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
  }, [courseId, dispatch])

  const courseDetail = useSelector((state) => state.courseDetail)

  function handleInscriptionClick(event) {
    event.preventDefault();
    setShowModal(true);
  }

  return (
    <div className={styles["course-detail-main"]}>
      <h1>{courseDetail.title}</h1>

      <div className={styles["course-detail-image-description"]}>
        <div className={styles["course-img-container"]} >
          <img 
            className={styles["course-img"]} 
            src={courseDetail.image}
            alt="detail-course" />
          <strong className={styles["course-genre"]}>{courseDetail.genre}</strong>
        </div>

        <div className={styles["right-detail-course"]}>
          <p className={styles["course-description"]}>
          {courseDetail.description}
          </p>
          <p className={styles["instructor-container"]}>
            Tallerista: {" "}
            <strong>{courseDetail.instructor}</strong>
          </p>

          <div className={styles["course-buttons-container"]}>
            <NavLink to="#" className={styles["inscription-button"]} onClick={handleInscriptionClick}>
              Inscribete Aquí
            </NavLink>
            
            {isLoggedInInLocalStorage && 
            <NavLink to={`/clase/${courseId}/0`} className={styles["inscription-button"]} >
              Ir a las clases
            </NavLink>
            }

            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                {<RegisterUser/>}
              </Modal>
            )}

            <div className={styles["help-container"]}>
              <span>¿Necesitas ayuda?</span>
              <NavLink 
                to={`https://wa.me/123456`}
                className={styles["help-button"]} >
                  Pide ayuda aqui
              </NavLink>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
};

export default CourseDetail;
