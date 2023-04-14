import * as actions     from "../../Redux/actions";
import CourseCard       from "../CourseCard/CourseCard";
import certificateImg   from "../../images/certificate.png"
import * as constants  from "../../constants/classDetailConstants";
import FormInscription  from "../FormInsciption/FormInscription";
import InstructorDetail from "../InstructorDetail/InstructorDetail";
import Modal            from "../Modal/Modal";
import ModalInscription from "../ModalInscription/ModalInscription";
import { NavLink }      from "react-router-dom";
import React            from 'react';
import RegisterUser     from "../RegisterUser/RegisterUser"
import styles           from "./CourseDetail.module.css"
import { useDispatch }  from "react-redux";
import { useEffect }    from 'react';
import { useMatch }     from "react-router-dom";
import { useSelector }  from "react-redux";
import { useState }     from 'react';
import usersImg         from "../../images/users-icon.svg"
import * as utils       from "../../utils"
import SelectedContent from "./SelectedContent/SelectedContent";

export const CourseDetail = () => {
  // const [showModal, setShowModal] = useState(false);
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // const [showInscriptionModal, setShowInscriptionModal] = useState(false);
  const dispatch = useDispatch();
  const match    = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  const courseDetail    = useSelector((state) => state.courseDetail);
  const courseSections  = useSelector((state) => state.courseSections);
  const courseUsers     = useSelector((state) => state.courseUsers);
  const instructor      = useSelector((state) => state.courseInstructor);
  const instructorStars = utils.getStarsRating(instructor.score)
  

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    dispatch(actions.getInstructorById(courseDetail.InstructorId));  
    dispatch(actions.getSectionsByCourseId(courseId));
    dispatch(actions.getUsersByCourseId(courseId));
  }, [courseId, dispatch, courseDetail.InstructorId])

  const [selectedButton, setSelectedButton] = useState(constants.VISION_GENERAL);

  const handleSelectContent = (selectedButtonContent) => setSelectedButton(selectedButtonContent);


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
            <div className={styles["instructor-name-container"]}>
              <img src={instructor.profile_picture} alt="instructor-course-detail" className={styles["instructor-head-picture"]}/>
              <div>
                <p>Instructor</p>
                <h2 className={styles["head-instructor-name"]}>{instructor.name}</h2>
              </div>
            </div>
            <span className={styles["stars-container"]}> {instructorStars} </span>
          </div>

          <div className={styles["course-detail-h1-container"]}>
            <h1 className={styles["course-title"]}>{courseDetail.title}</h1>
          </div>

          <div className={styles["course-detail-students-container"]}>
            <img className={styles["picture"]} src={usersImg} alt="user-card"/>
            <h3>{courseUsers.length} Estudiantes</h3>
          </div>
        </div>
      </div>

      <div className={styles["buttons-select-container"]}>
        <div className={styles["buttons-container"]}>
          <button onClick={() => handleSelectContent(constants.VISION_GENERAL)}>Vision General</button>
          <button onClick={() => handleSelectContent(constants.PREGUNTAS_FRECUENTES)}>Preguntas Frecuentes</button>
          <button onClick={() => handleSelectContent(constants.COMENTARIOS)}>Comentarios</button>
        </div>
      </div>

      

      <div className={styles["course-detail-container"]}>
        {/* <div className={styles["course-detail-info-container"]}>
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
          
          <div className={styles["certificate-portamor"]}>
            <div className={styles["course-detail-h1-container"]}>
              <h1>Certificado digital</h1>
            </div>
            <div className={styles["certificate-portamor-container"]}>
              <img src={certificateImg} alt="certificate-detail" className={styles["certificate-img"]} />
              <p>“Al final del curso podrás descargar un certificado virtual que acredite que has lo has finalizado con éxito”</p>
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
        </div> */}

      {
        selectedButton && 
        <SelectedContent 
          courseId={courseId}
          courseDetail={courseDetail} 
          selectedButtonContent={selectedButton} />
      }
      </div>
        
    </div>
  )
};

export default CourseDetail;
