import React from 'react';
import styles from '../StyleSheet/Modal.module.css';

function Modal({ onClose, children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;