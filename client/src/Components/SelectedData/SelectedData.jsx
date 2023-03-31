import React from "react";

//----Components
import ReviewCard from "../ReviewCard/ReviewCard";
import UserCard   from "../UserCard/UserCard";

//----Actions, Utils, Constants
import * as constants from "../../constants";
import * as actions   from "../../Redux/actions";
//styles
import styles from "./SelectedData.module.css";

const SelectedData = (props) => {
  const {
    courseDetail,
    courseId,
    courseReviews,
    dispatch,
    selectedButtonContent, 
  } = props;

   switch (selectedButtonContent) {
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

      return reviews;
    
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

    // case constants.PARTICIPANTES:
    //   return <div>Participantes</div>;

    // case constants.PREGUNTAS_FRECUENTES:
    //   return <div>Preguntas frecuentes</div>;

    default:
      return null;
  }
};

export default SelectedData;
