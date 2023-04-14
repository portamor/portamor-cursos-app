import { createCourse } from "../../../Redux/actions";
import CustomButton from "../../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import React from "react";
import styles from "./formCourse.module.css";
import Swal from "sweetalert2";

const FormCourse = ({ setActualForm }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [materialesCount, setMaterialesCount] = useState(1);
  const [formValues, setFormValues] = useState({
    image: "",
  });

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setFormValues({
        ...formValues,
        image: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    data.image = formValues.image
    const response = dispatch(createCourse(data, setActualForm));
    if (response !== null) {
      Swal.fire({
        icon: "success",
        title: `Curso creado con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear el curso",
        confirmButtonText: "Aceptar",
      });
    }
    reset();
  };

  const agregarMaterial = () => {
    setMaterialesCount(materialesCount + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="title">
          Título:
        </label>
        <input
          type="text"
          id="title"
          {...register("title", { required: "Este campo es requerido" })}
          className={styles.input}
        />
      </div>

      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="description">
          Descripción:
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Este campo es requerido" })}
          className={styles.input}
        />
      </div>

      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="image">
          Imagen:
        </label>
        <input
          type="file"
          id="image"
          {...register("image", { required: "Este campo es requerido" })}
          className={styles.input}
          accept=".jpg,.png,.jpeg"
          onChange={handleUploadFile}
        />
      </div>

      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="genre">
          Género:
        </label>
        <select id="genre" {...register("genre", { required: "Este campo es requerido" })} className={styles.input}>
          <option value="">Seleccione un género</option>
          <option value="Actividad Física">Actividad Física</option>
          <option value="Participación Social">Participación Social</option>
          <option value="Bienestar Mental">Bienestar Mental</option>
          <option value="Alimentación Saludable">Alimentación Saludable</option>
        </select>
      </div>

      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="type">
          Tipo:
        </label>
        <input
          type="text"
          id="type"
          {...register("type", { required: "Este campo es requerido" })}
          className={styles.input}
        />
      </div>

      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="rating">
          Calificación:
        </label>
        <input
          type="number"
          id="rating"
          min={1}
          max={5}
          {...register("rating", { min: 0, max: 5 })}
          className={styles.input}
          step="1"
        />
        <span>* El valor de la calificacion debe estar entre 1 y 5</span>
      </div>

      <div className={styles.materials_container}>
        <label className={styles.label} htmlFor="materials">
          Materiales:
        </label>
        {[...Array(materialesCount)].map((_, index) => (
          <input
            key={index}
            type="text"
            {...register(`materials[${index}]`, {
              required: "Este campo es requerido",
            })}
            className={styles.input}
          />
        ))}
        <CustomButton
          type="button"
          onClick={agregarMaterial}
          content={"Agregar material"}
        />
      </div>

      <CustomButton
        disabled={false}
        type={"submit"}
        primary={true}
        content={"Crear curso"}
      />
    </form>
  );
};

export default FormCourse;
