import * as actions    from "../../Redux/actions"
import CourseCard      from "../CourseCard/CourseCard";
import Paginated       from "../Paginated/Paginated";
import React           from "react";
import styles          from "./MyCourses.module.css";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector}  from "react-redux";

const MyCourses = () => {
  const dispatch             = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const courses = useSelector(state => state.courses)

  useEffect(() => {
    dispatch(actions.getCoursesOfUser(userFromLocalStorage.id))
  }, [dispatch])

  return (
    <div className={styles["my-courses-main"]}>
      {/* <Paginated actualPage={"MIS_CURSOS"}/> */}
      <div className={styles["cards-container"]}>
        {Array.isArray(courses) && courses.map(el => 
          <CourseCard
            key={el.id}
            id={el.id}
            image={el.image}
            title={el.title} />
        )}
      </div> 
    </div>
  );
};

export default MyCourses;