import * as actions    from "../../Redux/actions";
import { Link }        from "react-router-dom";
import React           from "react";
import Styles          from "./CourseCard.module.css";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";

const CourseCard = ({ id, title, image }) => {
  const dispatch = useDispatch();

  const courseDetail = useSelector((state) => state.courseDetail);

  useEffect(() => {
    dispatch(actions.getCourseDetail(id));
  }, [dispatch, id])

  return (
    <div className={Styles["course-card-main"]}>
        <div className={Styles["course-card"]}>
          <img src={image} alt="course-card" />
          <h3>{title}</h3>
          <div className={Styles["course-details-container"]}>
            <p>{courseDetail.duration}</p>
            <p>{courseDetail.level}</p>
          </div>
          <Link to={`/detalle-curso/${id}`} className={Styles["card-button"]}>
            Ver Más
          </Link>
        </div>
    </div>
  );
};

export default CourseCard;
