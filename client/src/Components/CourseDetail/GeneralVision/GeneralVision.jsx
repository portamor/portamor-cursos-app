import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import Modal from "../../Modal/Modal";
import CourseDetailCard from "../CourseDetailCard/CourseDetailCard";
import CoursePayment from '../CoursePayment/CoursePayment';
import certificateImg from "../../../images/certificate.png"
import Swal from 'sweetalert2';
import { inscribeUser, getCoursesOfUser } from "../../../Redux/actions";
import styles from "./GeneralVision.module.css";
import 'sweetalert2/dist/sweetalert2.min.css';

export default function GeneralVision({ accessToken }) {

  const dispatch = useDispatch();
  const match    = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  const [showModal, setShowModal] = useState(false);
  const [enrolledUser, setEnrolledUser] = useState(false);
  const [pendingEnrolledUser, setPendingEnrolledUser] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userId = useSelector((state) => state.user?.id);
  const courseDetail   = useSelector((state) => state.courseDetail);
  const courseSections = useSelector((state) => state.courseSections);
  const instructor = useSelector((state) => state.courseInstructor);
  const courseUsers = useSelector((state) => state.courseUsers);
  const user = useSelector((state) => state.user)

  useEffect(() => {
    userId && dispatch(getCoursesOfUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    userId && setEnrolledUser(courseUsers.find((user) => user.id === userId && user.CourseInscription.enrolmentStatus === 'matriculado'));
    userId && setPendingEnrolledUser(courseUsers.find((user) => user.id === userId && user.CourseInscription.enrolmentStatus === 'pendiente'));
  }, [userId, courseUsers]);

  async function handleInscriptionClick(data = null) {
    let paymentData = data === null ? { telephone: null, handleInscriptionClick: null } : data;

    if (isLoggedIn) {
      try {
        const response = await dispatch(inscribeUser(userId, courseId, accessToken, user, courseDetail, paymentData));
        Swal.fire({
          title: 'Inscripción exitosa',
          text: response.message,
          icon: 'success',
          timer: 5000
        });
        setTimeout(() => {
          window.location.reload();
        }, 5000);
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
    <>
      <div className={styles["course-detail-info-container"]}>
        <div className={styles["course-detail-info"]}>
          <div>
            {isLoggedIn ? !enrolledUser && (
              courseDetail.isPaymentCourse ? (
                !pendingEnrolledUser ?
                  <CoursePayment handleInscriptionClick={handleInscriptionClick} />
                :
                  <h1 className={styles["ver-clases-message"]}>Su matrícula esta en proceso de activación. Recibirá una notificación al culminar la misma dentro de las próximas 24 horas.</h1>
              ) : (
                <h1 className={styles["ver-clases"]} onClick={() => handleInscriptionClick()}> Inscribete ahora a este curso </h1>
              )
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

        <div className={styles["course-detail-info"]}>
          <div className={styles["course-detail-h1-container"]}>
            <h1>Introduccion</h1>
          </div>
          <h4>¡Bienvenidos y bienvenidas a nuestro Taller de {courseDetail.title}!</h4>
          <span>{courseDetail.description}</span>
        </div>

        <div className={styles["course-detail-info-instructor"]}>
          <div className={styles["course-detail-h1-container"]}>
            <h1>Tallerista</h1>
          </div>

          <div className={styles["course-detail-info-instructor-container"]}>
            <div className={styles["course-detail-info-instructor-img"]}>
              <img src={instructor.profile_picture} alt="instructor-course-detail" className={styles["instructor-picture"]} />
              <h2>{instructor.name}</h2>
            </div>
            <div className={styles["instructor-description"]}>
              <h4>Mensaje que te gustaria dejar a la comunidad emprendedora de Portamor:</h4>
              <span>{instructor.description}</span>
            </div>
          </div>
        </div>

        <div className={styles["sections-container"]}>
          <div className={styles["course-detail-h1-container"]}>
            <h1>Modulos</h1>
          </div>

          <div className={styles["course-detail-sections"]}>
            <span>A continuación, te presentamos los módulos del curso</span>
            <div className={styles["modules-container"]}>
              {courseSections && courseSections.map((section, index) => {
                return (
                  <div key={section.id}>
                    <p>Modulo {index + 1}:</p>
                    <p>{section.name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className={styles["materials-container"]}>
          <div className={styles["course-detail-h1-container"]}>
            <h1>Materiales</h1>
          </div>

          <div className={styles["course-detail-materials"]}>
            <span>Materiales que necesitarás:</span>
            <ol>
              {courseDetail.materials && courseDetail.materials.map((material, index) =>
                <li key={index}>
                  <span>{material}</span>
                </li>
              )}
            </ol>
          </div>
        </div>

        <div className={styles["certificate-portamor"]}>
          <div className={styles["course-detail-h1-container"]}>
            <h1>Certificado digital</h1>
          </div>
          <div className={styles["certificate-portamor-container"]}>
            <img src={certificateImg} alt="certificate-detail" className={styles["certificate-img"]} />
            <p>“Al final del curso podrás descargar un certificado virtual que acredite que has lo has finalizado con éxito”</p>
          </div>
        </div>


        <div className={styles["description-portamor-main"]}>
          <div className={styles["description-portamor"]}>
            <h2>PORTAMOR</h2>
            <p>Somos una Comunidad que empodera al adulto mayor por un envejecimiento activo y saludable a través de nuestra plataforma interactiva de aprendizaje integral.</p>

            <h2>METODOLOGIA</h2>
            <p>Los cursos serán desarrollados sobre la base de una metodología interactiva que promueve el autoaprendizaje y el trabajo colaborativo, complementada con presentaciones del especialista de cada sesión.</p>
          </div>
        </div >
      </div>

      <div className={styles["course-space"]}></div>
      <div className={styles["course-card-container"]}>
        <CourseDetailCard
          key={courseDetail.id}
          image={courseDetail.image}
          courseId={courseId} />
      </div>
    </>

  )
}