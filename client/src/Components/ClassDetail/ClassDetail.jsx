import React, { useState } from "react";

//----Components
import CustomButton    from "../CustomButton/CustomButton";
import CourseAccordion from "../CourseAccordion/CourseAccordion";
import ReviewCard      from "../ReviewCard/ReviewCard";
import { StarFill }    from "react-bootstrap-icons";
import UserCard        from "../UserCard/UserCard";
import certifiedImg    from "./certified-portamor.svg"

// example sections to accordion
import { courseSections } from "../DataBase/Json"

//----Styles
import styles from "./ClassDetail.module.css";

const ClassDetail = (props) => {

  return (
    <div className={styles["class-detail-main"]}>
      <div className={styles["video-description-container"]}>
        <div>
          <h1 className={styles["course-title"]}>
            Curso de {" "}
            <span className={styles["course-title-color"]}>Diseño de velas</span>
          </h1>
          <img 
          src="https://as01.epimg.net/meristation/imagenes/2020/03/10/betech/1583879055_794070_1583879168_noticia_normal_recorte1.jpg" 
          alt="" 
          lassName={styles["video"]} />

        </div>
        
        <div className={styles["description-container"]}>
          <h2 className={styles["description-title"]}>Descripcion del curso</h2>
          <p className={styles["description-text"]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <span className={styles["stars-container"]}>
            Valoracion del curso: {" "} 
            <StarFill color="red"/>  
            <StarFill color="red"/>  
            <StarFill color="red"/>  
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
          <div className={styles["buttons-container"]}>
            <CustomButton primary={true} content="COMENTARIOS"/>
            <CustomButton primary={false} content="PARTICIPANTES"/>
            <CustomButton primary={false} content="MATERIALES"/>
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