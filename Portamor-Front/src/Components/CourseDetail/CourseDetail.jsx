import { NavLink } from "react-router-dom";
import React, { useState } from 'react';
import styles      from "./CourseDetail.module.css"
import RegisterUser from "../RegisterUser/RegisterUser"
import Modal from "../Modal/Modal"

export const CourseDetail = ({match}) => {
  // const id = match.props.params
  const [showModal, setShowModal] = useState(false);

  function handleInscriptionClick(event) {
    event.preventDefault();
    setShowModal(true);
  }

  const courseDetail = {
    title: "Crea tus velas",
    image: "https://www.aromasdeandalucia.com/wp-content/uploads/2019/08/mujer-vela.jpg",
    genre: "Alimentacion saludable",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio enim hic molestiae itaque obcaecati, esse ipsam perspiciatis minus architecto iusto voluptate? Iure sequi mollitia corrupti molestias odit tempore, harum corporis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio enim hic molestiae itaque obcaecati, esse ipsam perspiciatis minus architecto iusto voluptate? Iure sequi mollitia corrupti molestias odit tempore, harum corporis!Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio enim hic molestiae itaque obcaecati, esse ipsam perspiciatis minus architecto iusto voluptate? Iure sequi mollitia corrupti molestias odit tempore, harum corporis!",
    instructor: "Juanito Perez"
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
