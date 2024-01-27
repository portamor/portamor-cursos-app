import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralVision from "../GeneralVision/GeneralVision";
import PaymentInscription from "../PaymentInscription/PaymentInscription";
import CourseDetailCard from "../CourseDetailCard/CourseDetailCard";
import ReviewCard from "../../ReviewCard/ReviewCard";
import FYQ from "../FYQAccordion/FYQAccordion"; 
import { getReviewsByCourseId } from "../../../Redux/actions";
import * as constants from "../../../constants/classDetailConstants";
import styles from "./SelectedContent.module.css";

const SelectedContent = ({ courseDetail, courseId, selectedButtonContent }) => {
  const dispatch = useDispatch();  
  const courseReviews  = useSelector((state) => state.courseReviews);

  useEffect(() => {
    dispatch(getReviewsByCourseId(courseId));
  }, [dispatch, courseId])

  switch (selectedButtonContent) {
    case constants.VISION_GENERAL:
      return <GeneralVision />
    
    case constants.INSCRIBIRME:
      return <PaymentInscription registerBtnRef={registerBtnRef} />

    case constants.COMENTARIOS:
      const isEqualToCourseId = courseReviews && courseReviews[0] && courseReviews[0].CourseId && courseReviews[0].CourseId === courseId;

      return (
        <div className={styles["reviews-main-container"]}>
          <div className={styles["reviews-and-card-container"]}>
            <div className={styles["reviews-container"]} >
            {
              isEqualToCourseId && courseReviews[0] ? 
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

            <div className={styles["course-space"]}></div>
            <div className={styles["course-card-container"]}>
              <CourseDetailCard 
              key={courseDetail.id}
              image={courseDetail.image}
              courseId={courseId} />
            </div>
          </div>
        </div>
    )
    
    case constants.PREGUNTAS_FRECUENTES:
      return (
        <div className={styles["fyq-main-container"]}>
          <div className={styles["fyq"]}>
            <div className={styles["fyq-container"]} >
              <FYQ />
            </div>

            <div className={styles["course-space"]}></div>
            <div className={styles["course-card-container"]}>
              <CourseDetailCard 
              key={courseDetail.id}
              image={courseDetail.image}
              courseId={courseId} />
            </div>
          </div>
        </div>
      )
    
    default:
      return null;
  }
};

export default SelectedContent;
