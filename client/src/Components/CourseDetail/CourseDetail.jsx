import * as actions from "../../Redux/actions";
import * as constants from "../../constants/classDetailConstants";
import React from 'react';
import styles from "./CourseDetail.module.css"
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';
import usersImg from "../../images/users-icon.svg"
import * as utils from "../../utils"
import SelectedContent from "./SelectedContent/SelectedContent";
import { Link } from "react-router-dom";




export const CourseDetail = () => {
  const dispatch = useDispatch();
  const match = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  const userId = useSelector((state) => state.user?.id)
  const courses = useSelector((state) => state.courses);
  const courseDetail = useSelector((state) => state.courseDetail);
  const courseSections = useSelector((state) => state.courseSections);
  const courseUsers = useSelector((state) => state.courseUsers);
  const instructor = useSelector((state) => state.courseInstructor);
  const instructorStars = utils.getStarsRating(instructor.score)

  let firstVideoId;
  if (courseSections[0] && courseSections[0].Videos[0].id) firstVideoId = courseSections[0].Videos[0].id

  useEffect(() => {
    dispatch(actions.getCourseDetail(courseId));
    typeof courseDetail.InstructorId !== "undefined" && dispatch(actions.getInstructorById(courseDetail.InstructorId));
    dispatch(actions.getSectionsByCourseId(courseId));
    dispatch(actions.getUsersByCourseId(courseId));
  }, [courseId, dispatch, courseDetail.InstructorId, instructor.id])

  const [selectedButton, setSelectedButton] = useState(constants.VISION_GENERAL);

  const handleSelectContent = (selectedButtonContent) => setSelectedButton(selectedButtonContent);


  //diame
  const [isEnrolled, setIsEnrolled] = useState(false);
  const userIsEnrolled = userId && courses.some((course) => course.id === courseId && course.userId === userId.id);


  return (
    <div className={styles["course-detail-main"]}>

      <div className={styles["course-detail-head"]}>
        <div className={styles["course-detail-head-container"]}>

          <div className={styles["head-instructor-container"]}>
            <div className={styles["instructor-name-container"]}>
              <img src={instructor.profile_picture} alt="instructor-course-detail" className={styles["instructor-head-picture"]} />
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
            <img className={styles["picture"]} src={usersImg} alt="user-card" />
            <h3>{courseUsers.length} Estudiantes</h3>
          </div>
        </div>
      </div>

      <div className={styles["buttons-select-container"]}>
        <div className={styles["buttons-container"]}>
          <button
            className={constants.VISION_GENERAL === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
            onClick={() => handleSelectContent(constants.VISION_GENERAL)}>Vision General</button>
          <button
            className={constants.PREGUNTAS_FRECUENTES === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
            onClick={() => handleSelectContent(constants.PREGUNTAS_FRECUENTES)}>Preguntas Frecuentes</button>
          <button
            className={constants.COMENTARIOS === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
            onClick={() => handleSelectContent(constants.COMENTARIOS)}>Comentarios</button>

          {userIsEnrolled && (
            <Link updateEnrolledStatus={setIsEnrolled} className={styles["link-classes-button"]} to={`/clase/${courseId}/${firstVideoId}` }>Ir a las clases</Link>
          )}

        </div>
      </div>

      <div className={styles["course-detail-container"]}>
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
