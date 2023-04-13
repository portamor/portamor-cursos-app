import * as actions from "../../Redux/actions";
import Modal from "../Modal/Modal";
import FormInscription from "../FormInsciption/FormInscription";
import { NavLink } from "react-router-dom";
import React from 'react';
import RegisterUser from "../RegisterUser/RegisterUser"
import styles from "./CourseDetail.module.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalInscription from "../ModalInscription/ModalInscription";

export const CourseDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [showInscriptionModal, setShowInscriptionModal] = useState(false);
  

  const dispatch = useDispatch();
  const match = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
  }, [courseId, dispatch])

  const courseDetail = useSelector((state) => state.courseDetail)

  function handleInscriptionModalClick() {
    if (isLoggedIn) {
      setShowInscriptionModal(true);
    } else {
      setShowModal(true);
    }
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
            {isLoggedIn ? (
              <ModalInscription courseId={courseDetail.id} />
            ) : (
              <NavLink to="#" className={styles["inscription-button"]} onClick={handleInscriptionModalClick}>
                Inicia Sesión para Inscribirte
              </NavLink>
            )}
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <Modal />
              </Modal>
            )}

            {showInscriptionModal && (
              <Modal onClose={() => setShowInscriptionModal(false)}>
                <ModalInscription />
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
