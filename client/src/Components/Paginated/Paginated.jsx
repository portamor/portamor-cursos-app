import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../Redux/actions";
import CourseCard from "../CourseCard/CourseCard";
import LoadingBox from "../LoadingBox/LoadingBox";
import styles from "./Paginated.module.css"

const Paginated = () => {
  const dispatch      = useDispatch();
  const currentPage   = useSelector((state) => state.currentPage);
  const pageSize    = useSelector((state) => state.pageSize);
  const loadingCourses = useSelector((state) => state.loadingCourses);
  const courses     = useSelector((state) => state.courses);
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
      <div className={styles["cards-container"]}>
        {
          !loadingCourses
          ?
           (courses.length ? courses.map(el => 
            <CourseCard
              key={el.id}
              id={el.id}
              image={el.image}
              title={el.title}
              duration={el.duration}
              level={el.level} />
            )
          :
            <h2 className={styles["title-not-found"]}>No se ha encontrado ningun curso</h2>
          )
          :
            <LoadingBox />
        }
      </div>
      {
        !loadingCourses && courses.length > pageSize && (
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
        )
      }
    </div>
  );
};

export default Paginated;