import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavFilter from "../NavFilter/NavFilter";
import CourseCard from "../CourseCard/CourseCard";
import { getCourses } from "../../Redux/actions";
import Styles from "../StyleSheet/Home.module.css";

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
    </div>
  );
};

export default Home;
