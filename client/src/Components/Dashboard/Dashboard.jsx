import React, { useState }  from "react";
import { CreateCourse }     from "../Forms";
import { CreateInstructor } from "../Forms";
import { CreateSection }    from "../Forms";
import { CreateVideo }      from "../Forms";
import * as constants       from "../../constants";

import styles from "../Forms/CreateCourse/formCourse.module.css"


const Dashboard = () => {
  // Logica para crear los datos
  // 1) El 1er form es CreateCourse. Este modificara el estago global en 'createdCourse'
  // 2) Usare ese 'createdCourse' para obtener el courseId para crear la section
  // 3) La creacion de la seciton modificar el estado gobal 'createdSection'
  // 4) Con esta ultima, podes acceder a su id para crear un video

  // Que sucede cuando se quiere crear mas de una seccion?
  // En este caso, tiene que haber una seccion para elegir en cual seccion se creara el video
  // Como lo puedo hacer?
  // The global state will have a property and his content will be an array of createdSections
  // I can map those sections and select one to create a video in its.


  // Logica para mostrar los forms
  // 1) Usar la funcion para setear el estado local del componente
  // 2) Pasar esta funcion por props a todos los formularios
  // 3) El estado usara los valores: "course", "section", "video", "instructor"
  // 4) Dependiendo que indica el estado, se mostrara el form para crear un curso, section o los otros

  const [actualForm, setActualForm] = useState(constants.SELECT_COURSE_FORM);

  return (
    <div className={styles.div_dashboard} >
      { actualForm === constants.SELECT_COURSE_FORM     && <CreateCourse     setActualForm={setActualForm} /> }
      { actualForm === constants.SELECT_INSTRUCTOR_FORM && <CreateInstructor setActualForm={setActualForm} /> }
      {/* Faltan estos dos */}
      { actualForm === constants.SELECT_SECTION_FORM    && <CreateSection    setActualForm={setActualForm} /> }
      { actualForm === constants.SELECT_VIDEO_FORM      && <CreateVideo      setActualForm={setActualForm} /> }
    </div>
  )
}

export default Dashboard;