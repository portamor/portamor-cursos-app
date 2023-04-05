import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions"
import * as utils from "../../utils"
import styles from './CreateVideo.module.css'
import CustomButton from "../CustomButton/CustomButton";
import { VIDEO } from "../../constants";

const CreateVideo = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState({
    videoTitle: "",
    videoLink: "",
    videoDescription: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });

    console.log(formValues)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = utils.validate(formValues, VIDEO);

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 

    // dispatch(actions.createReview(formValues))

    setFormValues({
      videoTitle: "",
      videoLink: "",
      videoDescription: "",
    })
  };


  return (
    <form onSubmit={handleSubmit} className={styles["create-video-main"]}>
      <div className={styles["create-video-input-container"]}>
        <label htmlFor="videoTitle">Titulo del video:</label>
        <input
          maxLength={50}
          id="videoTitle"
          name="videoTitle"
          value={formValues.videoTitle}
          onChange={handleChange}
          className={styles["video-input"]}
        ></input>
        {errors.videoTitle && <p>{errors.videoTitle}</p>}
      </div>

      <div className={styles["create-video-input-container"]}>
        <label htmlFor="videoLink">URL:</label>
        <input
          id="videoLink"
          name="videoLink"
          value={formValues.videoLink}
          onChange={handleChange}
          className={styles["video-input"]}
        ></input>
        {errors.videoLink && <p>{errors.videoLink}</p>}
      </div>

      <div className={styles["create-video-input-container"]}>
        <label htmlFor="videoDescription">Escribe una breve descripcion:</label>
        <textarea
          maxLength={250}
          id="videoDescription"
          name="videoDescription"
          rows="4"
          value={formValues.comment}
          onChange={handleChange}
          className={styles["video-textarea"]}
        ></textarea>
        {errors.videoDescription && <p>{errors.videoDescription}</p>}
      </div>


      <CustomButton
        disabled={errors.videoTitle || errors.videoLink || errors.videoDescription ? true : false}
        type={"submit"}
        content={"Añadir video"}
        primary={true} />
    </form>
  );
};

export default CreateVideo;
