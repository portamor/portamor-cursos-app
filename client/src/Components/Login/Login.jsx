import CustomButton      from "../CustomButton/CustomButton";
import { getUserByCode } from "../../Redux/actions"; 
import { loginSuccess }  from "../../Redux/actions"; 
import React             from "react";
import styles            from "./Login.module.css";
import Swal              from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useState }      from "react";
import { useDispatch }   from "react-redux";

function Login({onSuccess}) {
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(true); 
  const [codeError, setCodeError] = useState(null);
  const dispatch = useDispatch();

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const validateCode = (code) => {
    const codeRegex = /^[a-zA-Z0-9]{6,}$/;
    return codeRegex.test(code);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateCode(code)) {
      setCodeError("El código debe contener solo letras y números y tener al menos 6 caracteres.");
      Swal.fire({
        icon: 'error',
        title: codeError,
        text: 'El código ingresado no es válido. Por favor, intenta nuevamente.',
        confirmButtonText: 'Aceptar'
      });
      return 
    }
    try {
      const user = await dispatch(getUserByCode(code));
      onSuccess()
      if (user) {
        dispatch(loginSuccess(user));
        setShowModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1800
        });
         setTimeout(() => {
      window.location.reload();
    }, 3000);
      } else {
        console.error('No se encontró el usuario');
        Swal.fire({
          icon: 'error',
          title: 'Código incorrecto',
          text: 'El código ingresado no es válido. Por favor, intenta nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
      onSuccess()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <form onSubmit={handleSubmit}>
              <div className={styles["login-container"]}>
                <label htmlFor="code">Ingresa tu código:</label>
                <input type="text" id="code" value={code} onChange={handleCodeChange} />
              </div>
              <CustomButton type={"submit"} content={"Ingresar"} primary={true} disabled={false} />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Login;
