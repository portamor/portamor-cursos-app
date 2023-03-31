
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../Redux/actions"
import * as utils from "../../utils"

import {useMatch} from "react-router-dom"

//----Components
import CustomButton    from "../CustomButton/CustomButton";
import CourseAccordion from "../CourseAccordion/CourseAccordion";
import ReviewCard      from "../ReviewCard/ReviewCard";
import UserCard        from "../UserCard/UserCard";
import certifiedImg    from "./certified-portamor.svg"

// example sections to accordion
import { courseSections } from "../DataBase/Json"

//----Styles
import styles from "./ClassDetail.module.css";

const ClassDetail = (props) => {
  const dispatch = useDispatch();
  const match    = useMatch('/clase/:id');
  const courseId = match.params.id;
  
  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
  }, [courseId, dispatch])

  const courseDetail = useSelector((state) => state.courseDetail);
  const courseRating = utils.getStarsRating(courseDetail.rating);
  // const isWithCertificate = courseDetail.certificate;


  return (
    <div className={styles["class-detail-main"]}>
      <div className={styles["video-description-container"]}>
        <div>
          <h1 className={styles["course-title"]}>
            Curso de {" "}
            <span className={styles["course-title-color"]}>{courseDetail.title}</span>
          </h1>
          <img 
          src="https://as01.epimg.net/meristation/imagenes/2020/03/10/betech/1583879055_794070_1583879168_noticia_normal_recorte1.jpg" 
          alt="" 
          className={styles["video"]} />
        </div>
        
        <div className={styles["description-container"]}>
          <h2 className={styles["description-title"]}>Descripcion del curso</h2>
          <p className={styles["description-text"]}>{ courseDetail.description }</p>
          <span className={styles["stars-container"]}>
            Valoracion del curso: { courseRating }
          </span>
          <div className={styles["certified-container"]}>
            <span>Incluye certificado:</span>
            <strong>Si</strong>
            <img src={certifiedImg} alt="" />
          </div>
          <div className={styles["buttons-container"]}>
            <CustomButton primary={true} content="VER TEMARIO"/>
            <CustomButton primary={false} content="SOBRE EL INSTRUCTOR"/>
          </div>
        </div>
      </div>

      <div className={styles["secciones-temario-container"]}>
        <div className={styles["buttons-and-cards-container"]}>
          <div className={styles["buttons-sections-container"]}>
            <CustomButton primary={true}  content="COMENTARIOS"/>
            <CustomButton primary={false} content="MATERIALES"/>
            <CustomButton primary={false} content="PARTICIPANTES"/>
            <CustomButton primary={false} content="PREGUNTAS FRECUENTES"/>
          </div>
          <div className={styles["cards-container"]}>
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
          </div>
        </div>
        
        <CourseAccordion sections={courseSections}/>
      </div>
    </div>

  )
};

export default ClassDetail;