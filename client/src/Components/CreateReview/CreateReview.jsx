import React           from "react";
import { useState }    from "react";
import { useDispatch } from "react-redux";
//---Components
import { StarFill } from 'react-bootstrap-icons';
import CustomButton from "../CustomButton/CustomButton";
//--Styles
import styles from "./CreateReview.module.css"
//--utils,constants
import * as actions   from "../../Redux/actions"
import * as constants from "../../constants/createReviewConstants";
import { REVIEW }     from "../../constants";
import * as utils     from "../../utils";

const CreateReview = ({ courseId, userId}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    title: "",
    comment: "",
    stars_value: 0,
    userId: "d85ac82c-d989-43c0-a7ec-e17baa6d51b9",
    courseId: courseId,
  });

  const [ titles ] = useState([
    constants.EXCELENTE, 
    constants.RECOMENDADO, 
    constants.BUENO, 
    constants.NO_ME_GUSTO, 
    constants.MALO
  ]);

  const handleTitleChange = (title) => {
    setFormValues({
      ...formValues,
      title: title,
    });
  };

  const handleClickRatingStars = (index) => {
    setFormValues({
      ...formValues,
      stars_value: parseInt(index),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = utils.validate(formValues, REVIEW);

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 

    dispatch(actions.createReview(formValues))

    setFormValues({
      title: "",
      comment: "",
      stars_value: 0,
      // userId: userId,
      userId: "d85ac82c-d989-43c0-a7ec-e17baa6d51b9",
      courseId: courseId,
    })
  };

  return (
    <form onSubmit={handleSubmit} className={styles["create-review-main"]}>
      <div className={styles["create-review-input-container"]}>
        <label htmlFor="title-review">¿Qué tal tu experiencia con el curso?</label>
        <div className={styles["buttons-container"]}>
          {
            titles.map((title) => (
              <CustomButton 
              type={"button"}
              name={"title-review"}
              content={title}
              primary={title === formValues.title ? true : false}
              onClick={() => handleTitleChange(title)} />
            ))
          }
        </div>
        {errors.title && <p>{errors.title}</p>}
      </div>
      <div className={styles["create-review-input-container"]}>
        <label htmlFor="rating">¿Cuántas estrellas le darías?</label>
        <div className={styles["stars-container"]}>
          {[1, 2, 3, 4, 5].map((value) => (
            <StarFill
              key={value}
              className="star"
              size={30}
              style={{cursor: "pointer"}}
              color={value <= formValues.stars_value ? "red" : "#d9d9d9"}
              onClick={() => handleClickRatingStars(value)}
            />
          ))}
        </div>
        {errors.stars_value && <p>{errors.stars_value}</p>}
      </div>
      <div className={styles["create-review-input-container"]}>
        <label htmlFor="comment">Escribe tu comentario:</label>
        <textarea
          maxLength={250}
          id="comment"
          name="comment"
          rows="4"
          value={formValues.comment}
          onChange={handleChange}
          className={styles["review-textarea"]}
        ></textarea>
        {errors.comment && <p>{errors.comment}</p>}
      </div>

      <div className={styles["create-review-input-container"]}>
        <div className={styles["buttons-container"]}>
          <CustomButton 
            disabled={errors.title || errors.comment || errors.stars_value ? true : false}
            type={"submit"}
            content={"Crear comentario"}
            primary={true} />
        </div>
      </div>
      
    </form>
  );
};

export default CreateReview;