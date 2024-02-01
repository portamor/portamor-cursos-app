import React                   from "react";
import * as constants          from "../../constants";
import ChooseInstructor        from "../ChooseInstructor/ChooseInstructor";
import ChooseSectionToAddVideo from "../ChooseSection/ChooseSection";
import { CreateCourse }        from "../Forms";
import { CreateInstructor }    from "../Forms";
import { CreateSection }       from "../Forms";
import { CreateVideo }         from "../Forms";
import { useState }            from "react";
import ShowCreatedVideo        from "../ShowCreatedVideos/ShowCreatedVideos";
import styles from "../Dashboard/Dashboard.module.css"


const CreateCourses = () => {
  const [actualForm, setActualForm] = useState(constants.SELECT_COURSE_FORM);

  return (
    <div className={styles.div_dashboard} >
      { actualForm === constants.SELECT_COURSE_FORM && <CreateCourse setActualForm={setActualForm} /> }

      { 
        actualForm === constants.SELECT_INSTRUCTOR_FORM && (
        <div className={styles["instructor-container"]}>
          <CreateInstructor setActualForm={setActualForm} /> 
          <ChooseInstructor setActualForm={setActualForm} editMode={false} />
        </div>
      )}

      { 
        actualForm === constants.SELECT_SECTION_FORM && (
        <div className={styles["instructor-container"]}>
          <CreateSection           setActualForm={setActualForm} />
          <ChooseSectionToAddVideo setActualForm={setActualForm} />
        </div>
      )}

      { actualForm === constants.SELECT_VIDEO_FORM && (
        <div className={styles["video-container"]}>
          <CreateVideo setActualForm={setActualForm} /> 
          <ShowCreatedVideo /> 
        </div>
      )}
    </div>
  )
}

export default CreateCourses;