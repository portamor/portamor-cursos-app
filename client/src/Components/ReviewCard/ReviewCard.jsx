import styles from "./ReviewCard.module.css";
<<<<<<< HEAD
import {StarFill} from "react-bootstrap-icons"

const ReviewCard = (props) => {
  // Props = name, image, title, content, satisfaction

  const stars = [];
  for (let i = 1; i <= props.satisfaction; i++) {
    stars.push(<StarFill key={i} color="red" /> );
  }
=======
import * as utils from "../../utils/index"

const ReviewCard = (props) => {
  // Props = id, image, title, content, stars_value
  const stars = utils.getStarsRating(props.stars_value);
>>>>>>> testing

  return (
    <div className={styles["review-card"]}>
      <img className={styles["picture"]} src={props.image} alt="user-card"/>

      <div className={styles["info-review-container"]}>
        <div className={styles["head-info-review"]} >
<<<<<<< HEAD
          <h2>{props.name}</h2>
=======
          <h2>{props.title}</h2>
>>>>>>> testing
          <div>
            {stars}
            <strong>{props.title}</strong>
          </div>
        </div>
<<<<<<< HEAD
        <p>{props.content}</p>
=======
        <p>{props.comment}</p>
>>>>>>> testing
      </div>
    </div>
  );
};

export default ReviewCard;