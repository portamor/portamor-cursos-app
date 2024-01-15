import CustomButton from "../../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import React from "react";
import styles from "./formCourse.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as actions    from "../../../Redux/actions";
import FormSection from "../CreateSection/FormSection";


const FormCourse = ({ setActualForm }) => { // agregamos el prop "editData"
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const location = useLocation();
  const id = location?.state?? null;
  const { register, handleSubmit, reset } = useForm();
  const [materialesCount, setMaterialesCount] = useState(1);
  const [formValues, setFormValues] = useState({
    image: "",
  });
  const courseSet = useSelector((state)=> state?.courseDetail)

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

  useEffect(() => {
    if(id !== null){
  dispatch(actions.getCourseDetail(id));
  }
  }, [dispatch, id])

  const onSubmit = (data) => {
    console.log("onSubmit", data);
    data.image = formValues.image;
    if (id !== null) {
      dispatch(actions.editCourse(id, data));
      reset()
      navigate("/")
    } else {
      dispatch(actions.createCourse(data, setActualForm));
      reset()
    }
  };

  const agregarMaterial = () => {
    setMaterialesCount(materialesCount + 1);
  };
  return (
    <>
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
          defaultValue={courseSet?.title || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              title: e.target.value,
            })}
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
          defaultValue={courseSet?.description || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              description: e.target.value,
            })
          }
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
        <select
          id="genre"
          {...register("genre", { required: "Este campo es requerido" })}
          className={styles.input}
          defaultValue={courseSet?.genre || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              genre: e.target.value,
            })
          }
        >
          <option value="">Seleccione un género</option>
          <option value="Actividad Física">Actividad Física</option>
          <option value="Participación Social">Participación Social</option>
          <option value="Bienestar Mental">Bienestar Mental</option>
          <option value="Alimentación Saludable">Alimentación Saludable</option>
        </select>
      </div>
  
      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="type">
          Duración:
        </label>
        <input
          type="text"
          id="duration"
          {...register("duration", { required: "Este campo es requerido" })}
          className={styles.input}
          defaultValue={courseSet?.duration || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              duration: e.target.value,
            })
          }
        />
      </div>
  
      <div className={styles.input_container}>
        <label className={styles.label} htmlFor="type">
          Nivel:
        </label>
        <input
          type="text"
          id="level"
          {...register("level", { required: "Este campo es requerido" })}
          className={styles.input}
          defaultValue={courseSet?.level || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              level: e.target.value,
            })
          }
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
          defaultValue={courseSet?.rating || ""}
          onChange={(e) =>
            setFormValues({
              ...formValues,
              rating: e.target.value,
            })
          }
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
            defaultValue={courseSet?.materials || ""}
            onChange={(e) =>
              setFormValues({
                ...formValues,
              materials: e.target.value,
              })
            }
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
        content={id? "Modificar Curso": "Crear Curso"}
      />
    </form>
    
    <div>
      {
        id && <FormSection id={id}/>
      }
    </div>
  </>

  );
};

export default FormCourse;