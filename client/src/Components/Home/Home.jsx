import CourseCard    from "../CourseCard/CourseCard";
import NavFilter     from "../NavFilter/NavFilter";
import {getCourses}  from "../../Redux/actions";
import React         from "react";
import Styles        from "./Home.module.css";
import {useDispatch} from "react-redux";
import {useEffect}   from "react";
import {useSelector} from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const courses  = useSelector(state => state?.courses);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <div className={Styles["home-container"]}>
      <div className={Styles["top-container"]}>
        <h1 className={Styles["h1-home"]}>Conoce nuestros cursos</h1>
        <NavFilter />
      </div>
      <div className={Styles["cards-home"]}>
        {Array.isArray(courses) &&
          courses.map(el => {
            return (
              <CourseCard
                key={el.id}
                id={el.id}
                image={el.image}
                title={el.title}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
