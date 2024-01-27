import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useMatch, Link } from "react-router-dom";
import SelectedContent from "./SelectedContent/SelectedContent";
import LoadingBox from '../LoadingBox/LoadingBox';
import usersImg from "../../images/users-icon.svg"
import { getCourseDetail, getSectionsByCourseId, getUsersByCourseId, getInstructorById } from "../../Redux/actions";
import * as constants from "../../constants/classDetailConstants";
import { getStarsRating } from '../../utils';
import styles from "./CourseDetail.module.css"

export const CourseDetail = () => {
  const dispatch = useDispatch();
  const match = useMatch('/detalle-curso/:courseId');
  const courseId = match.params.courseId;

  const [enrolledUser, setEnrolledUser] = useState(false);
  const [selectedButton, setSelectedButton] = useState(constants.VISION_GENERAL);

  const userId = useSelector((state) => state.user?.id)
  const courseDetail = useSelector((state) => state.courseDetail);
  const courseSections = useSelector((state) => state.courseSections);
  const courseUsers = useSelector((state) => state.courseUsers);
  const instructor = useSelector((state) => state.courseInstructor);
  const instructorStars = getStarsRating(instructor.score);

  let firstVideoId;
  if (courseSections[0] && courseSections[0].Videos[0].id) firstVideoId = courseSections[0].Videos[0].id

  useEffect(() => {
    dispatch(getCourseDetail(courseId));
    dispatch(getSectionsByCourseId(courseId));
    dispatch(getUsersByCourseId(courseId));
    courseDetail.InstructorId && dispatch(getInstructorById(courseDetail.InstructorId));
  }, [dispatch, courseId, courseDetail.InstructorId]);

  useEffect(() => {
    userId && setEnrolledUser(courseUsers.find((user) => user.id === userId && user.CourseInscription.enrolmentStatus === 'matriculado'));
  }, [userId, courseUsers]);

  const handleSelectContent = (selectedButtonContent) => setSelectedButton(selectedButtonContent);

  return (
    <div className={styles["course-detail-main"]}>
      {
        instructor.id ? (
          <>
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
              {
                courseDetail.isPaymentCourse && !enrolledUser && (
                  <button
                    className={constants.INSCRIBIRME === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
                    onClick={() => handleSelectContent(constants.INSCRIBIRME)}>Inscribirme</button>
                )
              }
              <button
                className={constants.PREGUNTAS_FRECUENTES === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
                onClick={() => handleSelectContent(constants.PREGUNTAS_FRECUENTES)}>Preguntas Frecuentes</button>
              <button
                className={constants.COMENTARIOS === selectedButton ? styles["selected-button"] : styles["button-not-selected"]}
                onClick={() => handleSelectContent(constants.COMENTARIOS)}>Comentarios</button>
              {
                enrolledUser && (
                  <Link className={styles["link-classes-button"]} to={`/clase/${courseId}/${firstVideoId}` }>Ir a las clases</Link>
                )
              }
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
          </>
        )
        :
        <LoadingBox />
      }
    </div>
  )
};

export default CourseDetail;
