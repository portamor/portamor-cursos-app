/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCourses } from "../../Redux/actions";
import { createSection } from "../../Redux/actions";
import styles from './formCourse.module.css'

const FormSectionCreate = () => {
  const courses = useSelector((state) => state?.courses);
  console.log(courses, "cursos");
  const { handleSubmit, register, reset } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log(data.name, "data");
    const response = dispatch(createSection(data));
    alert("La sección se ha creado con éxito");
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
