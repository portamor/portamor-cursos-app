import CustomButton          from "../CustomButton/CustomButton";
import { getCoursesByGenre } from "../../Redux/actions";
import { getCourses }        from "../../Redux/actions";
import React                 from "react";
import Styles                from "./NavFilter.module.css";
import { useEffect }         from "react";
import { useState }          from "react";
import { useDispatch }       from "react-redux";
import { useSelector }       from "react-redux";

const NavFilter = ({ actualPage }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const courses = useSelector((state) => state.courses);

  const pageSize      = useSelector((state) => state.pageSize);


  useEffect(() => {
    actualPage === "HOME" && selectedGenre === "" && dispatch(getCourses(1, pageSize))

    function handleResize() {
      setIsMobile(window.innerWidth < 839);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [actualPage, dispatch, pageSize, selectedGenre]);


  function handleFilterClick(e) {
    if (e === "") {
      dispatch(getCourses(1, pageSize));
    } else {
      dispatch(getCoursesByGenre(e));
    }
    setSelectedGenre(e)
  }
  function handleSelectChange(event) {
    setSelectedGenre(event.target.value);
    if (event.target.value === "") {
      dispatch(getCourses());
    } else {
      dispatch(getCoursesByGenre(event.target.value));
    }
  }

  return (
    <div className={Styles["filter-container"]}>
      <ul className={Styles["ul-filter"]}>
        <CustomButton 
        content={"Todos los cursos"}
        primary={selectedGenre === "" ? true : false}
        onClick={() => handleFilterClick("")} />
        <CustomButton 
        content={"Actividad Fisica"}
        primary={selectedGenre === "Actividad Fisica" ? true : false}
        onClick={() => handleFilterClick("Actividad Fisica")} />
        <CustomButton 
        content={"Participacion Social"}
        primary={selectedGenre === "Participacion Social" ? true : false}
        onClick={() => handleFilterClick("Participacion Social")} />
        <CustomButton 
        content={"Bienestar Mental"}
        primary={selectedGenre === "Bienestar Mental" ? true : false}
        onClick={() => handleFilterClick("Bienestar Mental")} />
        <CustomButton 
        content={"Alimentacion Saludable"}
        primary={selectedGenre === "Alimentacion Saludable" ? true : false}
        onClick={() => handleFilterClick("Alimentacion Saludable")} />
      </ul>

      <select
        className={Styles["select-filter"]}
        value={selectedGenre}
        onChange={handleSelectChange} >
        <option value="">Todos</option>
        <option value="Actividad Fisica">Actividad Física</option>
        <option value="Participacion Social">Participación Social</option>
        <option value="Bienestar Mental">Bienestar Mental</option>
        <option value="Alimentacion Saludable">Alimentación Saludable</option>
      </select>
    </div>
  );
};

export default NavFilter;