import { useDispatch } from "react-redux";
import styles  from "./VideoCard.module.css";
import { Trash } from "react-bootstrap-icons";
import * as actions from "../../Redux/actions";

const VideoCard = ({ id, title }) => {
  const dispatch = useDispatch();

  const handleClickTrash = (videoId) => {
    dispatch(actions.deleteVideo(videoId))
  }

  return (
    <div className={styles["video-card"]}>
      <h2>{ title }</h2>
      <Trash color="red" size={"25px"} style={{cursor: "pointer"}} onClick={() => handleClickTrash(id)} /> 
    </div>
  );
};

export default VideoCard;