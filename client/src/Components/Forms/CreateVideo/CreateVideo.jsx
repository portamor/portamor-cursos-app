import * as actions    from "../../../Redux/actions"
import * as constants  from "../../../constants";
import CustomButton    from "../../CustomButton/CustomButton";
import React           from "react";
import { useState }    from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styles          from './CreateVideo.module.css'
import * as utils      from "../../../utils"

const CreateVideo = ({ setActualForm }) => {
  const dispatch          = useDispatch();
  const sectionToAddVideo = useSelector(state => state.sectionToAddVideo);

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    videoTitle: "",
    videoLink: "",
    videoDescription: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const formErrors = utils.validate(formValues, constants.VIDEO);

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

    const formErrors = utils.validate(formValues, constants.VIDEO);

    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 

    const sectionId = sectionToAddVideo.id
    dispatch(actions.createVideo(formValues, sectionId))

    setFormValues({
      videoTitle: "",
      videoLink: "",
      videoDescription: "",
    })

    // setActualForm(constants.SELECT_SECTION_FORM);
  };

  const handleBackButton = () => setActualForm(constants.SELECT_SECTION_FORM);

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

      <div className={styles["buttons-container"]}>
        <CustomButton
        disabled={errors.videoTitle || errors.videoLink || errors.videoDescription ? true : false}
        type={"submit"}
        content={"AÑADIR VIDEO"}
        primary={true} />

        <CustomButton 
        primary={false}
        type={"submit"}
        onClick={handleBackButton}
        content={"VOLVER"} />
      </div>

    </form>
  );
};

export default CreateVideo;
