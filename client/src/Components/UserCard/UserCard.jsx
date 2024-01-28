import styles  from "./UserCard.module.css";
import usersImg  from "../../images/users-icon.svg";
import CustomButton from "../CustomButton/CustomButton";

const UserCard = (props) => {
  // props = name, image, description, instructor

  return (
    <div className={styles["user-card"]}>
      <img 
      className={styles["picture"]} 
      src={props.image ? props.image : usersImg} 
      alt="user-card" />

      <div className={styles["info-user-container"]}>
        <h2>{props.name} {props.lastName}</h2>
        <p className={styles["user-description"]}>
          {!props.editMode && props.description} 
        </p>
        {
        props.instructor && (
          props.editMode ? <CustomButton onClick={props.onClick} content={"EDITAR"} primary={true}/>
          : <CustomButton onClick={props.onClick} content={"SELECCIONAR"} primary={true}/>
        )
        }
      </div>

    </div>
  );
};

export default UserCard;
