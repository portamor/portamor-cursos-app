import usersImg   from "../../images/users-icon.svg"
import styles     from "./ReviewCard.module.css";
import * as utils from "../../utils/index"

const ReviewCard = (props) => {
  // Props = id, image, title, content, stars_value
  const stars = utils.getStarsRating(props.stars_value);

  return (
    <div className={styles["review-card"]}>
      <img className={styles["picture"]} src={usersImg} alt="user-card"/>

      <div className={styles["info-review-container"]}>
        <div className={styles["head-info-review"]} >
          <h2>{props.title}</h2>
          <div>
            {stars}
            <strong>{props.title}</strong>
          </div>
        </div>
        <p>{props.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;