import styles       from "./UserCard.module.css";
import { Whatsapp } from "react-bootstrap-icons"

const UserCard = (props) => {
  // props = name, image, description, phoneNumber
  
  const handleWhatsappClick = () => {
    window.location.href = `https://wa.me/${props.phoneNumber}`;
  }

  return (
    <div className={styles["user-card"]}>

      <img className={styles["picture"]} src={props.image} alt="user-card"/>

      <div className={styles["info-user-container"]}>
        <h2>{props.name}</h2>
        <div className={styles["contact-container"]} onClick={handleWhatsappClick}>
          <strong className={styles["contact"]}>CONTACTAR</strong>
          <Whatsapp size={30} color={"red"} />
        </div>
        <p className={styles["user-description"]}>
          {props.description} 
        </p>
      </div>

    </div>
  );
};

export default UserCard;
