import React, { useEffect, useState } from "react";
import { useDispatch, useSelector }   from "react-redux";
//----Styles
import styles from "./InstructorDetail.module.css";
//----Actions, Utils, Constants
import * as actions   from "../../Redux/actions";
import * as utils     from "../../utils";
import * as constants from "../../constants";

import img from "./instructor.png";
import usersIcon from "../../images/users-icon.svg";
import reviewIcon from "../../images/reviews-icon.svg";
import youtubeIcon from "../../images/youtube-icon.svg";
import { StarFill } from "react-bootstrap-icons";

const InstructorDetail = () => {
// name: {
// description: {
// profile_picture: {
// score: {
// reviews: {
  
  return (
    <div className={styles["instructor-main"]}>
      <h1 className={styles["instructor-title"]}>Instructor</h1>
      <h2 className={styles["instructor-name"]}>Federico gomez</h2>
      <div className={styles["instructor-image-description-container"]}>
        <div>
          <div className={styles["instructor-details-container"]} >
           <img src={usersIcon} alt="user-icon" />
            <p>120 estudiantes</p>
          </div>
          <div className={styles["instructor-details-container"]} >
            <StarFill color="red" size="30px" /> 
            <p>7.5 calificacion </p>
          </div>
          <div className={styles["instructor-details-container"]} >
            <img src={reviewIcon} alt="review-icon" />
            <p>50 reseñas</p>
          </div>
          <div className={styles["instructor-details-container"]} >
            <img src={youtubeIcon} alt="youtube-icon" />
            <p>10 cursos</p>
          </div>
        </div>
        <div className={styles["instructor-picture-container"]}>
          <img 
          src={img} 
          alt="instructor"
          className={styles["instructor-picture"]} />
        </div>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Mollitia doloribus perferendis laboriosam fugit possimus? Quo laborum sunt, perspiciatis libero, dolor non possimus nesciunt quam exercitationem eligendi, molestias animi eveniet magnam.</p>
    </div>
  )
};

export default InstructorDetail;