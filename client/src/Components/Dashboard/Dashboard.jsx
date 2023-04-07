import React                from "react";
import { useState }         from "react";
import { CreateCourse }     from "../Forms";
import { CreateInstructor } from "../Forms";
import { CreateSection }    from "../Forms";
import { CreateVideo }      from "../Forms";
import * as constants       from "../../constants";
import ChooseInstructor     from "../ChooseInstructor/ChooseInstructor";
import styles               from "./Dashboard.module.css"
import ChooseSectionToAddVideo from "../ChooseSection/ChooseSection";

const Dashboard = () => {
  const [actualForm, setActualForm] = useState(constants.SELECT_COURSE_FORM);
  // const [actualForm, setActualForm] = useState(constants.SELECT_SECTION_FORM);

  return (
    <div className={styles.div_dashboard} >
      { actualForm === constants.SELECT_COURSE_FORM && <CreateCourse setActualForm={setActualForm} /> }

      { actualForm === constants.SELECT_INSTRUCTOR_FORM && (
        <div className={styles["instructor-container"]}>
          <CreateInstructor setActualForm={setActualForm} /> 
          <ChooseInstructor setActualForm={setActualForm} />
        </div>
      )}

      { actualForm === constants.SELECT_SECTION_FORM && (
        <div className={styles["instructor-container"]}>
          <CreateSection           setActualForm={setActualForm} />
          <ChooseSectionToAddVideo setActualForm={setActualForm} />
        </div>
      )}

      { actualForm === constants.SELECT_VIDEO_FORM   && <CreateVideo   setActualForm={setActualForm} /> }
    </div>
  )
}

export default Dashboard;