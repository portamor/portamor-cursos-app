import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import CustomButton    from "../../CustomButton/CustomButton";
import { INSTRUCTOR }  from "../../../constants";
import { StarFill }    from 'react-bootstrap-icons';
import * as utils      from "../../../utils";
import * as actions    from '../../../Redux/actions';
import styles          from './EditInstructor.module.css';

const EditInstructor = ({ instructorData }) => {
  const dispatch = useDispatch();
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    profile_picture: "",
    score: 0,
    reviews: 0
  });

  useEffect(() => {
    setFormValues({ ...instructorData });
  }, [instructorData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const tempFormValues = {
      ...formValues,
      [name]: value,
    };
    const formErrors = utils.validate(tempFormValues, INSTRUCTOR);
    
    if (Object.keys(formErrors).length === 0) setIsDisabledSubmit(false);
    else setIsDisabledSubmit(true);

    setFormValues(tempFormValues);
    setErrors(formErrors);
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
    const tempFormValues = {
      ...formValues,
      score
    };
    
    const formErrors = utils.validate(tempFormValues, INSTRUCTOR);
    
    if (Object.keys(formErrors).length === 0) setIsDisabledSubmit(false);
    else setIsDisabledSubmit(true);

    setFormValues(tempFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = utils.validate(formValues, INSTRUCTOR);
    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 

    dispatch(actions.updateInstructor(formValues));

    setFormValues({
      name: "",
      description: "",
      profile_picture: "",
      score: 0,
      reviews: 0
    });
  };

  return (
    <form 
    onSubmit={handleSubmit}
    className={styles["create-instructor-main"]} >
      <h1>Editar Instructor</h1>
      <div className={styles["create-instructor-input-container"]}>
        <label htmlFor="name">Nombre del instructor:</label>
        <input
          maxLength={50}
          id="name"
          name="name"
          className={styles["instructor-input"]}
          value={formValues?.name || ""}
          onChange={handleChange}
        />
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
              color={value <= formValues?.score ? "red" : "#d9d9d9"}
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
          value={formValues?.reviews || 0}
          onChange={handleChange}
          className={styles["instructor-input"]}
        />
      </div>
      {errors.reviews && <p className={styles.danger}>{errors.reviews}</p>}

      <div className={styles["create-instructor-input-container"]}>
        <label htmlFor="description">Mensaje a la Comunidad: </label>
        <textarea
          maxLength={250}
          id="description"
          name="description"
          rows="4"
          value={formValues?.description || ''}
          onChange={handleChange}
          className={styles["instructor-textarea"]}
        ></textarea>
        {errors.description && <p className={styles.danger}>{errors.description}</p>}
      </div>

      <div className={styles["buttons-container"]}>
        <CustomButton
        disabled={isDisabledSubmit}
        type={"submit"}
        content={"ACTUALIZAR INSTRUCTOR"}
        primary={true} />
      </div>

    </form>
  );
};

export default EditInstructor;
