import React           from "react";
import { useEffect }   from "react";
import { useForm }     from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {createSection} from "../../../Redux/actions";
import { getCourses }  from "../../../Redux/actions";
import styles          from '../CreateCourse/formCourse.module.css'

const FormSectionCreate = ({ setActualForm }) => {
  const courses = useSelector((state) => state?.courses);
  const { handleSubmit, register, reset } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(createSection(data, setActualForm));
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <div>      
        <label className={styles.label} >Elige el curso al cual quieres añadir una sección: </label>
      <select
        name="curso"
        {...register("id", { required: "Este campo es requerido" })}
      >
        {courses?.map((course) => (
          <option key={course.id} value={course.id}>
            {course.title}
          </option>
        ))}
      </select>
      </div>
      <br />
      <div>
      <label  className={styles.label} >Nombre de la sección:</label>
      <input
      className={styles.input_container}
        type="text"
        name="name"
        {...register("name", { required: "Este campo es requerido" })}
      />
      <button type="submit" className={styles.button} >Crear Sección</button>
      </div>
    </form>
  );
};

export default FormSectionCreate;
