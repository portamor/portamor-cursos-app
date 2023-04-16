import React, { useEffect }           from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//----Components
import CourseAccordion  from "../CourseAccordion/CourseAccordion";
import CreateReview     from "../CreateReview/CreateReview";
import InstructorDetail from "../InstructorDetail/InstructorDetail";
import ReviewCard       from "../ReviewCard/ReviewCard";
import UserCard         from "../UserCard/UserCard";
import FYQ              from "../CourseDetail/FYQAccordion/FYQAccordion";  
//----Actions, Utils, Constants
import * as constants from "../../constants/classDetailConstants";
import * as actions   from "../../Redux/actions";
//styles
import styles from "./SelectedData.module.css";
import DownloadCertificate from "../Certificate/DownaldCertificate";

const SelectedData = ({courseDetail, courseId, selectedButtonContent}) => {
  const dispatch = useDispatch();
  
  const courseUsers    = useSelector((state) => state.courseUsers);
  const courseReviews  = useSelector((state) => state.courseReviews);
  const courseSections = useSelector((state) => state.courseSections);

  useEffect(() => {
    dispatch(actions.getSectionsByCourseId(courseId));
    !courseReviews.length && dispatch(actions.getReviewsByCourseId(courseId));
    !courseUsers.length && dispatch(actions.getUsersByCourseId(courseId));
    !courseDetail && dispatch(actions.getCourseDetail(courseId));
  }, [dispatch, courseId, courseDetail, courseReviews.length, courseUsers.length, courseSections.length])

  switch (selectedButtonContent) {
    case constants.VER_TEMARIO:
      return <CourseAccordion sections={courseSections} courseId={courseId}/>
    
    case constants.SOBRE_EL_INSTRUCTOR:
      return <InstructorDetail instructorId={courseDetail.InstructorId}/>;

    case constants.COMENTARIOS:

      return (
        <div>
          <CreateReview courseId={courseId}/>
          <div className={styles["reviews-container"]} >
            {
            courseReviews && courseReviews[0] && courseReviews[0].CourseId && courseReviews[0].CourseId === courseDetail.id ?
            courseReviews.map((review) => 
            <ReviewCard 
            key         = {review.id}
            id          = {review.id}
            title       = {review.title}
            comment     = {review.comment}
            stars_value = {review.stars_value} />
            )
            :
            <p>No se han hecho comentarios de este curso todavia.</p>
        }
          </div>
        </div>
      )
    
    case constants.MATERIALES:
      const materials = courseDetail.materials.map((material) => 
        <h2 className={styles["info-component-material-title"]}>
          {material} <br />
        </h2>
      )
      return <div>
        <h2 className={styles["info-component-material-title"]}> 
          Para este curso necesitaras los siguientes materiales: <br /> 
        </h2>
        {materials}
      </div>;

    case constants.PARTICIPANTES:

      const partipants = courseUsers && courseUsers.map((user) => 
        <UserCard 
        key       = {user.id}
        id        = {user.id}
        lastName  = {user.lastName}
        name      = {user.name} />
      );
      return partipants;

    case constants.PREGUNTAS_FRECUENTES:
      return (
        <div className={styles["fyq-container"]} >
          <FYQ />
        </div>
      );
    
    case constants.DESCARGA_CERTIFICADO:
    return <DownloadCertificate title={courseDetail?.title} />

    default:
      return null;
  }
};



export default SelectedData;
