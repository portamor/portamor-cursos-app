import * as actions    from "../../Redux/actions"
import Paginated from "../Paginated/Paginated";
import React     from "react";
import Styles    from "./Home.module.css";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NavFilter from "../NavFilter/NavFilter";

const Home = () => {
  const dispatch    = useDispatch();
  const courses     = useSelector((state) => state.courses);
  const pageSize    = useSelector((state) => state.pageSize);

  useEffect(() => {
    !courses.length && dispatch(actions.getCourses(1, pageSize));
  }, [dispatch, pageSize, courses.length])

  return (
    <div className={Styles["home-container"]}>
      <NavFilter actualPage={"HOME"}/>
      <Paginated actualPage={"HOME"} courses={courses}/>
    </div>
  );
};

export default Home;
