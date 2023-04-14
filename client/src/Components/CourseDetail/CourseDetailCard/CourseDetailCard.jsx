import * as actions    from "../../../Redux/actions";
import { Link }        from "react-router-dom";
import React           from "react";
import Styles          from "./CourseDetailCard.module.css";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as utils      from "../../../utils";

const CourseDetailCard = ({ courseId, image }) => {
  const dispatch = useDispatch()

  const courseReviews = useSelector(state => state.courseReviews);

  let bestReview = 0;
  for (const review of courseReviews) {
    if(review.stars_value > bestReview) bestReview = review.stars_value;
  }

  const starsHTML = utils.getStarsRating(bestReview);

  useEffect(() => {
    dispatch(actions.getReviewsByCourseId(courseId))
  }, [dispatch, courseId])

  return (
    <div className={Styles["course-card"]}>
      <img src={image} alt="course-card" />
      <div className={Styles["review-container"]}>
        <strong>Reseña destacada</strong>
        <div>{starsHTML}</div>
      </div>

      <Link className={Styles["card-button"]} to={`https://api.whatsapp.com/send?phone=51943203772`}>
        Mas informacion
      </Link>
      <span>
        "Los cursos serán desarrollados sobre la base de una metodología interactiva que promueve el autoaprendizaje y el
         trabajo colaborativo, complementada con presentaciones del especialista de cada sesión."
      </span>
    </div>
  );
};

export default CourseDetailCard;
