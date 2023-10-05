import { useDispatch } from "react-redux";
import * as actions from "../../Redux/actions";
import CustomButton from "../CustomButton/CustomButton";
import styles       from "./SectionCard.module.css"
import { Trash } from "react-bootstrap-icons";

const SectionCard = ({ id, name, onClick }) => {
  const dispatch = useDispatch();

  const handleClickTrash = (sectionId) => {
    dispatch(actions.deleteSection(sectionId))
  }

  return (
    <div className={styles["section-card-main"]}>
      <h2>{ name }</h2>
      <CustomButton 
      onClick={onClick} 
      content={"Agregar Recurso"} 
      primary={true} />
      <Trash color="red" size={"25px"} style={{ cursor: "pointer" }} onClick={() => handleClickTrash(id)}/>
    </div>
  );
};

export default SectionCard;