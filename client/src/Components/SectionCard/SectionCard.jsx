import CustomButton from "../CustomButton/CustomButton";
import styles       from "./SectionCard.module.css"

const SectionCard = ({ name, onClick }) => {

  return (
    <div className={styles["section-card-main"]}>
      <h2>{ name }</h2>
      <CustomButton 
      onClick={onClick} 
      content={"Agregar video"} 
      primary={true} />
    </div>
  );
};

export default SectionCard;