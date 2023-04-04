import styles       from "./UserCard.module.css";

const UserCard = (props) => {
  // props = name, image, description, phoneNumber

  return (
    <div className={styles["user-card"]}>
      <img 
      className={styles["picture"]} 
      src={props.image} 
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
