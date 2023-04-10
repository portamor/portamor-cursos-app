import React           from 'react';
import { useState }    from 'react';
import { useDispatch } from 'react-redux';
import { postUser }    from '../../Redux/actions';
import Styles          from "./RegisterUser.module.css"
import CustomButton from '../CustomButton/CustomButton';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [formErrors, setFormErrors] = useState({});


  const validateForm = () => {
    let errors = {};
    let isValid = true;
  
    if (!name) {
      errors.name = 'El nombre no puede estar vacío';
      isValid = false;
    } else if (name.length < 3) {
      errors.name = 'El nombre debe tener al menos 3 letras';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(name)) {
      errors.name = 'El nombre no debe contener símbolos ni números';
      isValid = false;
    }
  
    if (!lastName) {
      errors.lastName = 'El apellido no puede estar vacío';
      isValid = false;
    } else if (lastName.length < 3) {
      errors.lastName = 'El apellido debe tener al menos 3 letras';
      isValid = false;
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      errors.lastName = 'El apellido no debe contener símbolos ni números';
      isValid = false;
    }
  
    if (!birthday) {
      errors.birthday = 'La fecha de cumpleaños no puede estar vacía';
      isValid = false;
    } else if (!isValidDate(birthday)) {
      errors.birthday = 'La fecha de cumpleaños no es válida';
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
  
  const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    const dNum = d.getTime();
    if (!dNum && dNum !== 0) return false;
    return d.toISOString().slice(0, 10) === dateString;
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const code = `${name.slice(0, 3)}${lastName.slice(0, 3)}${birthday.slice(0, 2)}`.toUpperCase();
      const response = await dispatch(postUser({ name, lastName, birthday, code }));
      console.log(response.data);
    }
  };

  return (
    <form  className={Styles["register-container"]} onSubmit={handleRegister}>
      <div className={Styles["name-input-container"]}>
        <label for="name">Nombre: </label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        {formErrors.name && <p className={Styles["error-message"]}>{formErrors.name}</p>}
      </div>
      <div className={Styles["lastname-input-container"]}>
        <label for="lastName">Apellido: </label>
        <input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        {formErrors.lastName && <p className={Styles["error-message"]}>{formErrors.lastName}</p>}
      </div>
      <div className={Styles["birthday-input-container"]}>
        <label for="birthday">Fecha de cumpleaños: </label>
        <input type="date" id="birthday" value={birthday} onChange={(event) => setBirthday(event.target.value)} />
        {formErrors.brithday && <p className={Styles["error-message"]}>{formErrors.brithday}</p>}
      </div>
      <CustomButton type={"submit"} content={"Registrarme"} primary={true} disabled={false} />
    </form>
  );
};

export default RegisterUser;