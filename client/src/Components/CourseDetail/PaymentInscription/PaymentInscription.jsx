import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Modal from "../../Modal/Modal";
import CoursePayment from '../CoursePayment/CoursePayment';
import Swal from 'sweetalert2';
import { inscribeUser, getCoursesOfUser } from "../../../Redux/actions";
import styles from "./PaymentInscription.module.css";
import 'sweetalert2/dist/sweetalert2.min.css';

export default function PaymentInscription({ accessToken }) {

  const dispatch = useDispatch();
  const match    = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  const [showModal, setShowModal] = useState(false);
  const [enrolledUser, setEnrolledUser] = useState(false);
  const [pendingEnrolledUser, setPendingEnrolledUser] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userId = useSelector((state) => state.user?.id);
  const courseDetail   = useSelector((state) => state.courseDetail);
  const courseUsers = useSelector((state) => state.courseUsers);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    userId && dispatch(getCoursesOfUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    userId && setEnrolledUser(courseUsers.find((user) => user.id === userId && user.CourseInscription.enrolmentStatus === 'matriculado'));
    userId && setPendingEnrolledUser(courseUsers.find((user) => user.id === userId && user.CourseInscription.enrolmentStatus === 'pendiente'));
  }, [userId, courseUsers]);

  async function handleInscriptionClick(paymentData) {
    if (isLoggedIn) {
      try {
        const response = await dispatch(inscribeUser(userId, courseId, accessToken, user, courseDetail, paymentData));
        Swal.fire({
          title: 'Inscripción exitosa',
          text: response.message,
          icon: 'success',
          timer: 8000
        });
        setTimeout(() => {
          window.location.reload();
        }, 8000);
      } catch (error) {
        Swal.fire({
          title: 'Error en la inscripción',
          text: error.message,
          icon: 'error',
        });
      }
    } else {
      setShowModal(true);
    }
  }
  
  return (
    <div className={styles["course-detail-info-container"]}>
      <div className={styles["course-detail-info"]}>
        {isLoggedIn ? !enrolledUser && (
          !pendingEnrolledUser ?
            <CoursePayment handleInscriptionClick={handleInscriptionClick} />
          :
            <h1 className={styles["ver-clases-message"]}>Su matrícula esta en proceso de activación. Se activará dentro de los próximos minutos. Refrescar la página para visualizar la opcion IR A CLASES en el menu superior a este mensaje.</h1>
        ) : (
          <h1 className={styles["ver-clases"]} onClick={() => handleInscriptionClick()}>Inicia sesion para inscribirte a este curso</h1>
        )}
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Modal />
          </Modal>
        )}
      </div>
    </div>
  )
}