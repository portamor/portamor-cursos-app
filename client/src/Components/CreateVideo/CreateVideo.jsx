import React           from "react";
import { useState }    from "react";
import { useDispatch } from "react-redux";
//---Components
import CustomButton from "../CustomButton/CustomButton";
//---actions, utils, constatns
import * as actions from "../../Redux/actions"
import * as utils   from "../../utils"
import { VIDEO }    from "../../constants";
//---styles
import styles from './CreateVideo.module.css'

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
    const formErrors = utils.validate(formValues, VIDEO);

    setFormValues({
      ...formValues,
      [name]: value,
    });

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 
    
    setErrors({})
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formErrors = utils.validate(formValues, VIDEO);

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 


    /* Hardcode */
    const sectionId = "c43e4d03-b096-4cea-96b0-67f5d5cd6c4a"
    dispatch(actions.createVideo(formValues, sectionId))

    setFormValues({
      videoTitle: "",
      videoLink: "",
      videoDescription: "",
    })
  };

  return (
    <form 
    onSubmit={handleSubmit} 
    className={styles["create-video-main"]} >
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
          value={formValues.videoDescription}
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
