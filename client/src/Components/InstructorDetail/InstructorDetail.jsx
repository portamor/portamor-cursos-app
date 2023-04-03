import React, { useEffect }           from "react";
import { useDispatch, useSelector }   from "react-redux";
//----Styles
import styles from "./InstructorDetail.module.css";
//----Actions
import * as actions from "../../Redux/actions";
//----Icons
import usersIcon    from "../../images/users-icon.svg";
import reviewIcon   from "../../images/reviews-icon.svg";
import youtubeIcon  from "../../images/youtube-icon.svg";
import { StarFill } from "react-bootstrap-icons";

const InstructorDetail = ({ instructorId }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getInstructorById(instructorId));  
  }, [instructorId, dispatch])

  const instructor = useSelector(state => state.courseInstructor);

  return (
    <div className={styles["instructor-main"]}>
      <h1 className={styles["instructor-title"]}>Instructor</h1>
      <h2 className={styles["instructor-name"]}>{instructor.name}</h2>
      <div className={styles["instructor-image-description-container"]}>
        <div>
          {/* <div className={styles["instructor-details-container"]} >
           <img src={usersIcon} alt="user-icon" />
            <p>120 estudiantes</p>
          </div> */}
          <div className={styles["instructor-details-container"]} >
            <StarFill color="red" size="30px" /> 
            <p>{instructor.score} calificacion </p>
          </div>
          <div className={styles["instructor-details-container"]} >
            <img src={reviewIcon} alt="review-icon" />
            <p>{instructor.score} reseñas</p>
          </div>
          <div className={styles["instructor-details-container"]} >
            <img src={youtubeIcon} alt="youtube-icon" />
            <p>{instructor.Courses && instructor.Courses.length} cursos</p>
          </div>
        </div>
        <div className={styles["instructor-picture-container"]}>
          <img 
          src={instructor.profile_picture} 
          alt="instructor"
          className={styles["instructor-picture"]} />
        </div>
      </div>
      <p>{instructor.description}</p>
    </div>
  )
};

export default InstructorDetail;