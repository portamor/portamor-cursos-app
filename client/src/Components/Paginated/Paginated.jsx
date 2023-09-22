import CourseCard      from "../CourseCard/CourseCard";
import { getCourses }  from "../../Redux/actions";
import NavFilter       from "../NavFilter/NavFilter";
import LoadingBox from "../LoadingBox/LoadingBox";
import React           from "react";
import styles          from "./Paginated.module.css"
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import { useState }    from "react";

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

  useEffect(() => {
    !loadingCourses && !courses.length && dispatch(getCourses(1, pageSize));
  }, [dispatch, pageSize, courses.length])

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

      <div className={styles["paginated-numbers-container"]}>
        {
          !loadingCourses && (
            <>
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
            </>
          )
        }
      </div>
    </div>
  );
};

export default Paginated;