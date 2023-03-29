import React, { useState } from 'react';
import Login from '../Login/Login';
import RegisterUser from '../RegisterUser/RegisterUser';
import styles from '../StyleSheet/Modal.module.css';

function Modal({ onClose }) {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const onRegister = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setShowContent(true);
  };

  const onLogin = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowContent(true);
  };

  const registerForm = showRegisterForm ? <RegisterUser /> : null;
  const loginForm = showLoginForm ? <Login /> : null;
  const content = showContent ? (registerForm || loginForm) : null;
  const buttonText = showRegisterForm ? 'Registrarme' : 'Iniciar sesión';

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ❌
        </button>
        <h1>Bienvenidos!</h1>
        {content && <div className={styles.modalContent}>{content}</div>}
        {!showContent && (
          <div className={styles.buttonsContainer}>
            {!showLoginForm && (
              <button className={styles.registerButton} onClick={onRegister}>
                Registrarme
              </button>
            )}
            {!showRegisterForm && (
              <button className={styles.registerButton} onClick={onLogin}>
                Iniciar sesión
              </button>
            )}
          </div>
        )}
        {showContent && (
          <div className={styles.buttonsContainer}>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;