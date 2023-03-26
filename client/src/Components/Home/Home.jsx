import React           from "react";
import { useEffect }   from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCourses }  from "../../Redux/actions";

import CourseAccordion from "../CourseAccordion/CourseAccordion";
import CourseCard      from "../CourseCard/CourseCard";
import NavFilter       from "../NavFilter/NavFilter";

import Styles from "../StyleSheet/Home.module.css";

// example sections to accordion
import { courseSections } from "../DataBase/Json";

const Home = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();

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
        {courses?.map((el) => {
          return <CourseCard key={el.id} image={el.image} title={el.title} />;
        })}
      </div>

      {/* <CourseAccordion sections={courseSections} /> */}
    </div>
  );
};

export default Home;
