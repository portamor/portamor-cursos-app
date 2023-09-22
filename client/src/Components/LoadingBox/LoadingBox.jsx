import styles from './LoadingBox.module.css';

const LoadingBox = () => {
  return (
    <div className="spinner-container">
      <div className={styles["loading-spinner"]}>
      </div>
    </div>
  );
};

export default LoadingBox;