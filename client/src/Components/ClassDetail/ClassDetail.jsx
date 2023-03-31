import React, { useEffect, useState } from "react";
import { useDispatch, useSelector }   from "react-redux";
import { useMatch } from "react-router-dom"
//----Components
import CustomButton    from "../CustomButton/CustomButton";
import CourseAccordion from "../CourseAccordion/CourseAccordion";
import SelectedData from "../SelectedData/SelectedData";
import certifiedImg    from "./certified-portamor.svg"
//----Styles
import styles from "./ClassDetail.module.css";
//----Actions, Utils, Constants
import * as actions   from "../../Redux/actions";
import * as utils     from "../../utils";
import * as constants from "../../constants";


const ClassDetail = (props) => {
  const dispatch = useDispatch();
  const match    = useMatch('/clase/:courseId/:videoId');
  const courseId = match.params.courseId;

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    dispatch(actions.getSectionsByCourseId(courseId));
  }, [courseId, dispatch])

  const courseDetail   = useSelector((state) => state.courseDetail);
  const courseSections = useSelector((state) => state.courseSections);
  const courseReviews  = useSelector((state) => state.courseReviews);
  const courseRating   = utils.getStarsRating(courseDetail.rating);
  // const isWithCertificate = courseDetail.certificate;

  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (selectedButtonContent) => {
    setSelectedButton(selectedButtonContent);
  };

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
            <CustomButton 
            primary={selectedButton === constants.COMENTARIOS ? true : false}  
            content={constants.COMENTARIOS}
            onClick={() => handleButtonClick(constants.COMENTARIOS)} />
            <CustomButton 
            primary={selectedButton === constants.MATERIALES ? true : false}
            content={constants.MATERIALES}
            onClick={() => handleButtonClick(constants.MATERIALES)} />
            <CustomButton 
            primary={selectedButton === constants.PARTICIPANTES ? true : false}
            content={constants.PARTICIPANTES} 
            onClick={() => handleButtonClick(constants.PARTICIPANTES)} />
            <CustomButton 
            primary={selectedButton === constants.PREGUNTAS_FRECUENTES ? true : false}
            content={constants.PREGUNTAS_FRECUENTES}
            onClick={() => handleButtonClick(constants.PREGUNTAS_FRECUENTES)} />
          </div>

          <div className={styles["cards-container"]}>
            {/* {selectedButton && <infoComponent selectedButtonContent={selectedButton} />} */}
            {
            selectedButton && 
            <SelectedData 
              selectedButtonContent={selectedButton}
              courseId={courseId}
              courseReviews={courseReviews}
              dispatch={dispatch}
              courseDetail={courseDetail} />
            }
          </div>
        </div>
        
        <CourseAccordion sections={courseSections}/>
      </div>
    </div>

  )
};

export default ClassDetail;