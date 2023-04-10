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

      if (!videoTitle.trim())       errors.videoTitle       = "El titulo del video es necesario";
      if (!videoLink.trim())        errors.videoLink        = "El video debe tener una URL";
      if (!videoDescription.trim()) errors.videoDescription = "La descripcion del video es necesaria";

      return errors;

    case constants.INSTRUCTOR: 
      if (!values.name.trim()) errors.name = "El titulo del video es necesario";

      if (!values.score) errors.score = "El instructor debe tener una calificacion";
      
      if (!values.reviews)          errors.reviews = "Debe tener un numero de reseñas";
      else if(values.reviews < 0)   errors.reviews = "El numero de reseñas no puede ser menor a 0";
      else if(values.reviews > 100) errors.reviews = "El numero de reseñas no puede ser mayor a 100";
      
      if (!values.profile_picture) errors.profile_picture = "El instructor debe tener una foto";

      return errors;

    default:
      return errors;
  }

};