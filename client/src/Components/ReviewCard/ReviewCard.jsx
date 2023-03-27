import styles from "./ReviewCard.module.css";
import {StarFill} from "react-bootstrap-icons"

const ReviewCard = (props) => {
  // Props = name, image, title, content, satisfaction

  const stars = [];
  for (let i = 1; i <= props.satisfaction; i++) {
    stars.push(<StarFill key={i} color="red" /> );
  }

  return (
    <div className={styles["review-card"]}>
      <img className={styles["picture"]} src={props.image} alt="user-card"/>

      <div className={styles["info-review-container"]}>
        <div className={styles["head-info-review"]} >
          <h2>{props.name}</h2>
          <div>
            {stars}
            <strong>{props.title}</strong>
          </div>
        </div>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default ReviewCard;