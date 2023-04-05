import { StarFill }    from "react-bootstrap-icons";
import * as constants  from "../constants"

export const getStarsRating = (ratingNumber) => {
  const starsRating = [];

  for (let i = 1; i <= ratingNumber; i++) {
    starsRating.push(<StarFill key={i} color="red" /> );
  }

  return starsRating;
};

export const validate = (values, type) => {
  const errors = {};

  switch(type) {
    case constants.REVIEW: 
      if (!values.title.trim())   errors.title = "El titulo del comentario es necesario";
      if (!values.comment.trim()) errors.comment = "Necesitas escribir un comentario"; 
      if (!values.stars_value)    errors.stars_value = "Necesitas dar una puntuacion al curso";

      return errors;
    
    case constants.VIDEO: 
      const { videoTitle, videoLink, videoDescription } = values;

      if (!videoTitle.trim())       errors.videoTitle  = "El titulo del video es necesario";
      if (!videoLink.trim())        errors.videoLink   = "El video debe tener una URL"; 
      if (!videoDescription.trim()) errors.stars_value = "La descripcion del video es necesaria";

      return errors;

    default:
      return errors;
  }

};