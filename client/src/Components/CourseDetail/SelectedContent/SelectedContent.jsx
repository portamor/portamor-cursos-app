
import React           from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//----Components
import ReviewCard       from "../../ReviewCard/ReviewCard";
import GeneralVision    from "../GeneralVision/GeneralVision";
//----Actions, Utils, Constants
import * as constants from "../../../constants/classDetailConstants";
import * as actions   from "../../../Redux/actions";
//styles
import styles from "./SelectedContent.module.css";
import CourseCard from "../../CourseCard/CourseCard";

const SelectedContent = ({ courseDetail, courseId, selectedButtonContent }) => {
  const dispatch = useDispatch();
  
  const courseUsers    = useSelector((state) => state.courseUsers);
  const courseReviews  = useSelector((state) => state.courseReviews);

  switch (selectedButtonContent) {
    case constants.VISION_GENERAL:
      return <GeneralVision />

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
        <div className={styles["reviews-main-container"]}>
          <div className={styles["reviews-and-card-container"]}>
            <div className={styles["reviews-container"]} >
              {reviews}
            </div>

            <div className={styles["course-space"]}></div>
            <div className={styles["course-card-container"]}>
              <CourseCard
                key={courseDetail.id}
                id={courseDetail.id}
                image={courseDetail.image}
                title={courseDetail.title} />
            </div>
          </div>
        </div>
    )
    
    case constants.PREGUNTAS_FRECUENTES:
      return <div>Preguntas frecuentes</div>;
    
    default:
      return null;
  }
};

export default SelectedContent;
