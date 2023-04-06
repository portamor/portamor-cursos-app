import styles  from "./UserCard.module.css";
import usersImg  from "../../images/users-icon.svg";

const UserCard = (props) => {
  // props = name, image, description, phoneNumber

  return (
    <div className={styles["user-card"]}>
      <img 
      className={styles["picture"]} 
      src={usersImg} 
      alt="user-card" />

      <div className={styles["info-user-container"]}>
        <h2>{props.name} {props.lastName}</h2>
        <p className={styles["user-description"]}>
          {props.description} 
        </p>
      </div>

    </div>
  );
};

export default UserCard;
