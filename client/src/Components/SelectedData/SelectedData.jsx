import React           from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//----Components
import CourseAccordion  from "../CourseAccordion/CourseAccordion";
import CreateReview     from "../CreateReview/CreateReview";
import InstructorDetail from "../InstructorDetail/InstructorDetail";
import ReviewCard       from "../ReviewCard/ReviewCard";
import UserCard         from "../UserCard/UserCard";
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

  switch (selectedButtonContent) {
    case constants.VER_TEMARIO:
      if(!courseSections.length) dispatch(actions.getSectionsByCourseId(courseId)) 

      return <CourseAccordion sections={courseSections} courseId={courseId}/>
    
    case constants.SOBRE_EL_INSTRUCTOR:
      return <InstructorDetail instructorId={courseDetail.InstructorId}/>;

    case constants.COMENTARIOS:
      if(!courseReviews.length) dispatch(actions.getReviewsByCourseId(courseId));

      const reviews = courseReviews && courseReviews.map((review) => 
        <ReviewCard 
        key         = {review.id}
        id          = {review.id}
        title       = {review.title}
        comment     = {review.comment}
        stars_value = {review.stars_value} />
      );

      return (
        <div>
          <CreateReview courseId={courseId}/>
          <div className={styles["reviews-container"]} >
            {reviews}
          </div>
        </div>
      )
    
    case constants.MATERIALES:
      if(!courseDetail) dispatch(actions.getCourseDetail(courseId));

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
      if(!courseUsers.length) dispatch(actions.getUsersByCourseId(courseId));

      const partipants = courseUsers && courseUsers.map((user) => 
        <UserCard 
        key       = {user.id}
        id        = {user.id}
        lastName  = {user.lastName}
        name      = {user.name} />
      );
      return partipants;

    case constants.PREGUNTAS_FRECUENTES:
      return <div>Preguntas frecuentes</div>;
    
    case constants.DESCARGA_CERTIFICADO:
    return <DownloadCertificate title={courseDetail?.title} />

    default:
      return null;
  }
};



export default SelectedData;
