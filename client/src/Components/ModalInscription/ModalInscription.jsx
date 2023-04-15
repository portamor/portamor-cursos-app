import React, { useState } from 'react';
import FormInscription from '../FormInsciption/FormInscription';
import styles from "./ModalInscription.module.css"
import CustomButton from '../CustomButton/CustomButton';

const ModalInscription = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contentLabel, setContentLabel] = useState('');

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setContentLabel('Inscripción al curso');
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };
  
  return (
    <>
      <h1 className={styles["ver-clases"]} onClick={handleOpenModal}>Inscribete ahora a este curso! 👆</h1>

      {modalIsOpen && ( 
        <div>
          <div className={styles.modal}>
            <button onClick={handleCloseModal} type="button" className={styles['close-button']}>
              X
            </button>
            <FormInscription
              courseId={props.courseId}
              accessToken={props.accessToken}
              onCloseModal={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ModalInscription;
