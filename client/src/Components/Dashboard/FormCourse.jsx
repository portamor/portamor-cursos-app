import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { postCourse } from '../../Redux/actions'
import styles from "./formCourse.module.css";

const FormCourse = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const [materialesCount, setMaterialesCount] = useState(1);
  
    const onSubmit = async (data) => {
      console.log(data);
      const response = await dispatch(postCourse(data))
      console.log(response.data)
    alert('Se ha creado el curso correctamente')
    reset()
    };
  
    const agregarMaterial = () => {
      setMaterialesCount(materialesCount + 1);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
        <div className={styles.input_container} >
          <label className={styles.label} htmlFor="title">Título:</label>
          <input type="text" id="title" {...register("title")} className={styles.input} />
        </div>
  
        <div className={styles.input_container} >
          <label className={styles.label}  htmlFor="description">Descripción:</label>
          <textarea id="description" {...register("description")} className={styles.input} />
        </div>
  
        <div className={styles.input_container} >
          <label className={styles.label}  htmlFor="image">Imagen:</label>
          <input type="text" id="image" {...register("image")} className={styles.input} />
        </div>
  
        <div className={styles.input_container}  >
          <label className={styles.label}  htmlFor="genre">Género:</label>
          <input type="text" id="genre" {...register("genre")} className={styles.input} />
        </div>
  
        <div className={styles.input_container} >
          <label className={styles.label}  htmlFor="type">Tipo:</label>
          <input type="text" id="type" {...register("type")} className={styles.input} />
        </div>
  
        <div className={styles.input_container} >
          <label className={styles.label}  htmlFor="rating">Calificación:</label>
          <input type="number" id="rating" {...register("rating")} className={styles.input} />
        </div>
  
        <div className={styles.materials_container} >
          <label className={styles.label}  htmlFor="materials">Materiales:</label>
          {[...Array(materialesCount)].map((_, index) => (
            <input key={index} type="text" {...register(`materials[${index}]`)} className={styles.input} />
          ))}
          <button type="button" onClick={agregarMaterial} className={styles.add_material_button} >
            Agregar material
          </button>
        </div>
  
        <button type="submit" className={styles.button} >Agregar curso</button>
      </form>
    );
};

export default FormCourse;
