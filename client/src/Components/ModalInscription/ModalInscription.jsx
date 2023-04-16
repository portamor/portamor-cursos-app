import React           from 'react';
import { useState }    from 'react';
import FormInscription from '../FormInsciption/FormInscription';
import styles          from "./ModalInscription.module.css"

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
      <button className={styles["ver-clases"]} onClick={handleOpenModal}>Inscribete</button>

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
