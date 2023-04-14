import React           from "react";
import {createSection} from "../../../Redux/actions";
import CustomButton    from "../../CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { useForm }     from "react-hook-form";
import { useSelector } from "react-redux";
import styles          from './FormSection.module.css'
import Swal from "sweetalert2";

const FormSectionCreate = () => {
  const dispatch      = useDispatch();
  const createdCourse = useSelector(state => state.createdCourse)
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    const response = dispatch(createSection(data.name, createdCourse.id));
    if (response !== null) {
      Swal.fire({
        icon: "success",
        title: `Sección creada con éxito`,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear Sessión",
        confirmButtonText: "Aceptar",
      });
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} >
      <div className={styles.input_container}>
        <label className={styles.label} >Nombre de la sección:</label>
        <input
          className={styles.input}
          type="text"
          name="name"
          {...register("name", { required: "Este campo es requerido" })} />
      </div>

      <CustomButton 
        disabled={false}
        type={"submit"}
        primary={true}         
        content={"Crear seccion"} />
    </form>
  );
};

export default FormSectionCreate;
