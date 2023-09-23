import Paginated from "../Paginated/Paginated";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect}     from "react";
import { getCourses, getCoursesByGenre }  from "../../Redux/actions";
import Styles    from "./Home.module.css";
import NavFilter from "../NavFilter/NavFilter";

const Home = () => {
  const dispatch = useDispatch();
  const [coursesGenre, setCoursesGenre] = useState('');
  const pageSize    = useSelector((state) => state.pageSize);

  useEffect(() => {
    if (coursesGenre === '')
      dispatch(getCourses(1, pageSize));
    else
      dispatch(getCoursesByGenre(coursesGenre));
  }, [dispatch, coursesGenre, pageSize]);

  const handleCoursesGenre = (genre) => {
    setCoursesGenre(genre);
  };

  return (
    <div className={Styles["home-container"]}>
      <NavFilter handleCoursesGenre={handleCoursesGenre}/>
      <Paginated />
    </div>
  );
};

export default Home;
