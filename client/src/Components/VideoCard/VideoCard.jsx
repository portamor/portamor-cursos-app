import styles  from "./VideoCard.module.css";

const VideoCard = ({ title }) => {
  return (
    <div className={styles["video-card"]}>
      <h2>{ title }</h2>
    </div>
  );
};

export default VideoCard;