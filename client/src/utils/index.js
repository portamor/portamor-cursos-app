import { StarFill }    from "react-bootstrap-icons";

export const getStarsRating = (ratingNumber) => {
  const starsRating = [];

  for (let i = 1; i <= ratingNumber; i++) {
    starsRating.push(<StarFill key={i} color="red" /> );
  }

  return starsRating;
};