import React           from "react";
import { useState }    from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//---Components
import CustomButton from "../../CustomButton/CustomButton";
import { StarFill } from 'react-bootstrap-icons';
//---actions, utils, constatns
import * as actions   from "../../../Redux/actions"
import * as utils     from "../../../utils"
import { INSTRUCTOR } from "../../../constants";
//---styles
import styles from './CreateInstructor.module.css'

const CreateInstructor = ({ setActualForm }) => {
  const dispatch       = useDispatch();
  const createdCourse  = useSelector((state) => state.createdCourse);
  
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    profile_picture: "",
    score: 0,
    reviews: 0,
    courseId: createdCourse.id
  });


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    const formErrors = utils.validate(formValues, INSTRUCTOR);
    
    if (Object.keys(formErrors).length === 0) setIsDisabledSubmit(false);

    setErrors({})
  };

  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    const formErrors = utils.validate(formValues, INSTRUCTOR);
    
    if (Object.keys(formErrors).length === 0) setIsDisabledSubmit(false);

    reader.onloadend = () => {
      setFormValues({
        ...formValues,
        profile_picture: reader.result
      });
    };

    reader.readAsDataURL(file);
  };

  const handleClickRatingStars = (index) => {
    let score = parseInt(index);

    if(formValues.score === score) score = 0;
    
    const formErrors = utils.validate(formValues, INSTRUCTOR);
    
    if (Object.keys(formErrors).length === 0) setIsDisabledSubmit(false);

    setFormValues({
      ...formValues,
      score: score,
    });

  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = utils.validate(formValues, INSTRUCTOR);

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 

    dispatch(actions.createInstructor(formValues, setActualForm));

    setIsDisabledSubmit(true);

    setFormValues({
      name: "",
      description: "",
      profile_picture: "",
      score: 0,
      reviews: 0,
      courseId: "f033734d-34de-48a1-aaee-9b1c2de6ba78"
    })
  };

  return (
    <form 
    onSubmit={handleSubmit} 
    className={styles["create-instructor-main"]} >
      <h1>Crear Instructor</h1>
      <div className={styles["create-instructor-input-container"]}>
        <label htmlFor="videoTitle">Nombre del instructor:</label>
        <input
          maxLength={50}
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          className={styles["instructor-input"]}
        ></input>
        {errors.name && <p className={styles.danger}>{errors.name}</p>}
      </div>

      <div className={styles["select-file-container"]}>
        <input 
        id="profile_picture"
        name="profile_picture"
        type="file"
        onChange={handleUploadFile} 
        className={styles["instructor-input"]} />
        { 
        formValues.profile_picture && 
        <img src={formValues.profile_picture} alt="instructor" className={styles["selected-file"]} /> 
        }
      </div>

      <div className={styles["create-instructor-input-container"]}>
        <label htmlFor="score">Calificacion:</label>
        <div className={styles["stars-container"]}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <StarFill
              key={value}
              className="star"
              size={30}
              style={{cursor: "pointer"}}
              color={value <= formValues.score ? "red" : "#d9d9d9"}
              onClick={() => handleClickRatingStars(value)} />
          ))}
          {errors.score && <p className={styles.danger}>{errors.score}</p>}
        </div>
      </div>


      <div className={styles["create-instructor-input-container"]}>
      <label htmlFor="reviews">Reseñas:</label>
        <input
          id="reviews"
          name="reviews"
          max={100}
          min={0}
          type="number"
          value={formValues.reviews}
          onChange={handleChange}
          className={styles["instructor-input"]}
        ></input>
      </div>
      {errors.reviews && <p className={styles.danger}>{errors.reviews}</p>}

      <div className={styles["create-instructor-input-container"]}>
        <label htmlFor="description">Escribe una breve descripcion:</label>
        <textarea
          maxLength={250}
          id="description"
          name="description"
          rows="4"
          value={formValues.description}
          onChange={handleChange}
          className={styles["instructor-textarea"]}
        ></textarea>
        {errors.description && <p className={styles.danger}>{errors.description}</p>}
      </div>

      <div className={styles["buttons-container"]}>
        <CustomButton
        disabled={isDisabledSubmit}
        type={"submit"}
        content={"AÑADIR VIDEO"}
        primary={true} />

        <CustomButton 
        primary={false}
        type={"button"}
        content={"VOLVER"} />
      </div>

    </form>
  );
};

export default CreateInstructor;
