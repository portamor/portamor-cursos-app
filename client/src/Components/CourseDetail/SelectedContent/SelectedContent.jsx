import * as actions     from "../../../Redux/actions";
import * as constants   from "../../../constants/classDetailConstants";
import CourseDetailCard from "../CourseDetailCard/CourseDetailCard";
import FYQ              from "../FYQAccordion/FYQAccordion.jsx"; 
import GeneralVision    from "../GeneralVision/GeneralVision";
import React            from "react";
import { useEffect }    from "react";
import ReviewCard       from "../../ReviewCard/ReviewCard";
import styles           from "./SelectedContent.module.css";
import { useDispatch }  from "react-redux";
import { useSelector }  from "react-redux";

const SelectedContent = ({ courseDetail, courseId, selectedButtonContent }) => {
  const dispatch = useDispatch();
  
  const courseUsers    = useSelector((state) => state.courseUsers);
  const courseReviews  = useSelector((state) => state.courseReviews);

  useEffect(() => {
    dispatch(actions.getReviewsByCourseId(courseId));
  }, [courseId, dispatch])

  switch (selectedButtonContent) {
    case constants.VISION_GENERAL:
      return <GeneralVision />

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
