import styles          from "./Paginated.module.css"
import CourseCard      from "../CourseCard/CourseCard";
import { getCourses }  from "../../Redux/actions";
import React           from "react";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";

const Paginated = ({ size }) => {
  const dispatch = useDispatch();
  
  const courses       = useSelector((state) => state.courses);
  const currentPage   = useSelector((state) => state.currentPage);
  const pageSize      = useSelector((state) => state.pageSize);
  const totalCourses  = useSelector((state) => state.totalCourses);

  const pageCount = Math.ceil(totalCourses / pageSize);

  useEffect(() => {
    dispatch(getCourses(currentPage, pageSize));
  }, [dispatch, currentPage, pageSize]);

  const handlePrevPage = () => {
    if (currentPage > 1) dispatch(getCourses(currentPage - 1, pageSize));
  };

  const handleNextPage = () => {
    const nextNumber = parseInt(currentPage) + 1;
    if (currentPage < pageCount) dispatch(getCourses(nextNumber, pageSize));
  };
  
  return (
    <div className={styles["paginated-main"]}>
      <div>
        <button onClick={handlePrevPage}>Prev</button>
        <span>Page {currentPage} of {pageCount}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Paginated;