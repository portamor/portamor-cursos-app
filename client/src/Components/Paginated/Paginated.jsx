import CourseCard      from "../CourseCard/CourseCard";
import { getCourses }  from "../../Redux/actions";
import NavFilter       from "../NavFilter/NavFilter";
import React           from "react";
import styles          from "./Paginated.module.css"
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import { useState }    from "react";

const Paginated = ({ actualPage }) => {
  const dispatch      = useDispatch();
  const courses       = useSelector((state) => state.courses);
  const currentPage   = useSelector((state) => state.currentPage);
  const pageSize      = useSelector((state) => state.pageSize);
  const totalCourses  = useSelector((state) => state.totalCourses);
  const pageCount     = Math.ceil(totalCourses / pageSize);
  const pageNumbers   = [];

  const [ limitNumbersPage ]                        = useState(5);
  const [minLimitNumberPage, setMinLimitNumberPage] = useState(0);
  const [maxLimitNumberPage, setMaxLimitNumberPage] = useState(5);
  
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  const numbersToShow = pageNumbers.slice(
    minLimitNumberPage,
    maxLimitNumberPage
  );

  useEffect(() => {
    !courses.length && dispatch(getCourses(currentPage, pageSize));
  }, [dispatch, courses.length, currentPage, pageSize]);

  const handlePrevPage = () => {
    const pastNumber = parseInt(currentPage) - 1;
    
    if (pastNumber === 0) return;
    
    if (currentPage > 1) dispatch(getCourses(pastNumber, pageSize));

    if (pastNumber % limitNumbersPage === 0) {
      setMaxLimitNumberPage(maxLimitNumberPage - limitNumbersPage);
      setMinLimitNumberPage(minLimitNumberPage - limitNumbersPage);
    }
  };

  const handleNextPage = () => {
    const nextNumber = parseInt(currentPage) + 1;

    if (nextNumber > pageNumbers.length) return;

    if (nextNumber > maxLimitNumberPage) {
      setMaxLimitNumberPage(maxLimitNumberPage + limitNumbersPage);
      setMinLimitNumberPage(minLimitNumberPage + limitNumbersPage);
    }
    
    if (currentPage < pageCount) dispatch(getCourses(nextNumber, pageSize));
  };

  const handleClickOnIndex = (number) => dispatch(getCourses(number, pageSize));

  return (
    <div className={styles["paginated-main"]}>
      <div className={styles["paginated-numbers-container"]}>
        <button className={styles["paginated-number"]} onClick={handlePrevPage}>{"<"}</button>

        {numbersToShow && numbersToShow.map(number => 
          <span 
          key={number} 
          className={number === parseInt(currentPage) ? styles["current-page"] : styles["paginated-number"] } 
          onClick={() => handleClickOnIndex(number)}>
            {number}
          </span>
        )}

        <button className={styles["paginated-number"]} onClick={handleNextPage}>{">"}</button>
      </div>

      { actualPage=== "HOME" && <NavFilter actualPage={"HOME"}/> }

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

export default Paginated;