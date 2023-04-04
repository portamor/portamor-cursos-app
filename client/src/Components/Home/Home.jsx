<<<<<<< HEAD
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavFilter from "../NavFilter/NavFilter";
import CourseCard from "../CourseCard/CourseCard";
import { getCourses } from "../../Redux/actions";
import Styles from "../StyleSheet/Home.module.css";

const Home = () => {
  const courses = useSelector((state) => state.courses);
=======
import React           from "react";
import { useEffect }   from "react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCourses }  from "../../Redux/actions";

import CourseAccordion from "../CourseAccordion/CourseAccordion";
import CourseCard      from "../CourseCard/CourseCard";
import NavFilter       from "../NavFilter/NavFilter";
import ReviewCard from "../ReviewCard/ReviewCard";

import Styles from "../StyleSheet/Home.module.css";

// example sections to accordion
import { courseSections } from "../DataBase/Json";


const Home = () => {
  const courses = useSelector((state) => state.courses?.courses);
>>>>>>> testing
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
<<<<<<< HEAD
=======

      {/* <ReviewCard 
      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BetQecEPZPH1770yc9Wtm2_yr90fGe1S0JkPrDXLnA&s"
      name="Wilmer Rafael Castro"
      title="RECOMENDADO" 
      content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet possimus totam harum. Veritatis facilis quasi consequuntur qui culpa! Quas, repellendus autem fugit officiis eius provident obcaecati a corrupti cum magnam?
      " 
      satisfaction={3} />
      <ReviewCard 
      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2BetQecEPZPH1770yc9Wtm2_yr90fGe1S0JkPrDXLnA&s"
      name="Wilmer Rafael Castro"
      title="Excelente" 
      content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet possimus totam harum. Veritatis facilis quasi consequuntur qui culpa! Quas, repellendus autem fugit officiis eius provident obcaecati a corrupti cum magnam?
      " 
      satisfaction={5} /> */}

      {/* <CourseAccordion sections={courseSections} /> */}
>>>>>>> testing
    </div>
  );
};

export default Home;
