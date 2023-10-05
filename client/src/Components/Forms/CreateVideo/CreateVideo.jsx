import React, { useState }           from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton    from "../../CustomButton/CustomButton";
import * as actions    from "../../../Redux/actions"
import * as constants  from "../../../constants";
import * as utils      from "../../../utils"
import styles          from './CreateVideo.module.css'

const CreateVideo = ({ setActualForm }) => {
  const dispatch          = useDispatch();
  const sectionToAddVideo = useSelector(state => state.sectionToAddVideo);

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    isVideo: true,
    videoTitle: "",
    videoLink: "",
    videoDescription: "",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'isVideo') value = value === 'video' ? true : false;
    const formErrors = utils.validate({ ...formValues, [name]: value }, constants.VIDEO);
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    } 
    
    setErrors({});
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
      isVideo: true,
      videoTitle: "",
      videoLink: "",
      videoDescription: "",
    })
  };

  const handleBackButton = () => setActualForm(constants.SELECT_SECTION_FORM);

  return (
    <form 
    onSubmit={handleSubmit} 
    className={styles["create-video-main"]} >
      <div className={styles["create-video-input-container"]}>
        <label htmlFor="isVideo">Tipo de recurso:</label>
        <select
          id="isVideo"
          name="isVideo"
          value={formValues.isVideo ? 'video' : 'otros'}
          className={styles["video-input"]}
          onChange={handleChange}
        >
          <option value="video">Video</option>
          <option value="otros">Otros</option>
        </select>
      </div>
      <div className={styles["create-video-input-container"]}>
        <label htmlFor="videoTitle">Titulo del recurso:</label>
        <input
          maxLength={50}
          id="videoTitle"
          name="videoTitle"
          value={formValues.videoTitle}
          onChange={handleChange}
          className={styles["video-input"]}
        />
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
        />
        {errors.videoLink && <p>{errors.videoLink}</p>}
      </div>

      <div className={styles["buttons-container"]}>
        <CustomButton
        disabled={errors.videoTitle || errors.videoLink || errors.videoDescription ? true : false}
        type={"submit"}
        content={"AÑADIR RECURSO"}
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
