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
import usersImg from "../../images/users-icon.svg"
import InstructorDetail from "../InstructorDetail/InstructorDetail";
import CourseCard from "../CourseCard/CourseCard";

export const CourseDetail = () => {
  // const [showModal, setShowModal] = useState(false);
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const [showInscriptionModal, setShowInscriptionModal] = useState(false);
  

  const dispatch = useDispatch();
  const match = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;
  const courseDetail = useSelector((state) => state.courseDetail);
  const courseSections = useSelector((state) => state.courseSections);
  const instructor = useSelector(state => state.courseInstructor);

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    dispatch(actions.getInstructorById(courseDetail.InstructorId));  
    dispatch(actions.getSectionsByCourseId(courseId)) 
  }, [courseId, dispatch, courseDetail.InstructorId])


  // function handleInscriptionModalClick() {
  //   if (isLoggedIn) {
  //     setShowInscriptionModal(true);
  //   } else {
  //     setShowModal(true);
  //   }
  // }


  return (
    <div className={styles["course-detail-main"]}>

      <div className={styles["course-detail-head"]}>
        <div className={styles["course-detail-head-container"]}>
          <div className={styles["head-instructor-container"]}>
            <p>Instructor</p>
            <h2 className={styles["head-instructor-name"]}>{instructor.name}</h2>
          </div>

          <div className={styles["course-detail-h1-container"]}>
            <h1>{courseDetail.title}</h1>
          </div>

          <div className={styles["course-detail-students-container"]}>
            <img className={styles["picture"]} src={usersImg} alt="user-card"/>
            <h3>0 Estudiantes</h3>
          </div>
        </div>
      </div>

      <div className={styles["course-detail-container"]}>
        <div className={styles["course-detail-info-container"]}>
          <div className={styles["course-detail-info"]}>
            <div className={styles["course-detail-h1-container"]}>
              <h1>Introduccion</h1>
            </div>
            <h4>¡Bienvenidos y bienvenidas a nuestro Taller de {courseDetail.title}!</h4>
            <span>
              Curso donde se proporcionará conocimientos necesarios y actualizados sobre nutrición y alimentación en el adulto mayor, así como herramientas de trabajo útiles, que permitan conocer el estado nutricional en la tercera edad y recomendaciones en distintas situaciones fisiopatológicas (Enfermedades Crónicas No Transmisibles),  de forma que puedan aplicarse.
            </span>
          </div>
          
          <div className={styles["course-detail-info-instructor"]}>
            <div className={styles["course-detail-h1-container"]}>
              <h1>Tallerista</h1>
            </div>

            <div className={styles["course-detail-info-instructor-container"]}>
              <div className={styles["course-detail-info-instructor-img"]}>
                <img src={instructor.profile_picture} alt="instructor-course-detail" className={styles["instructor-picture"]}/>
                <h2>{instructor.name}</h2>
              </div>
              <div className={styles["instructor-description"]}>
                <h4>Mensaje que te gustaria dejar a la comunidad emprendedora de Portamor:</h4>
                <span>Emprender es un camino muy bonito, lleno de satisfacción y orgullo por las metas que logramos. Pero también puede ser difícil a veces y debemos aprender a controlar la frustración para respirar un momento y luego seguir adelante. Lo más importante para cualquier emprendimiento, es la validación: sea cual sea tu producto, pregunta a tu público qué piensa, cómo puedes mejorar, etc. Este feedback te ayudará a llegar más lejos, evitará gastos innecesarios y te ayudará a tener más clientes.</span>
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
                    <div>
                      <p>Modulo {index + 1}</p>
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
              {courseDetail.materials && courseDetail.materials.map(material => 
                <li>{material}</li>
              )}
              </ol>
            </div>
          </div>

          <div className={styles["description-portamor"]}>
            <h2>PORTAMOR</h2>
            <p>Somos una Comunidad que empodera al adulto mayor por un envejecimiento activo y saludable a través de nuestra plataforma interactiva de aprendizaje integral.</p>

            <h2>METODOLOGIA</h2>
            <p>Los cursos serán desarrollados sobre la base de una metodología interactiva que promueve el autoaprendizaje y el trabajo colaborativo, complementada con presentaciones del especialista de cada sesión.</p>
          </div>
        </div>

        <div className={styles["course-space"]}></div>
        <div className={styles["course-card-container"]}>
          <CourseCard
            key={courseDetail.id}
            id={courseDetail.id}
            image={courseDetail.image}
            title={courseDetail.title} />
        </div>
      </div>
        
    </div>
  )
};

export default CourseDetail;
