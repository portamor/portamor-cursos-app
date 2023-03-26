import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../Redux/actions';
import Styles from "../StyleSheet/RegisterUser.module.css"

const RegisterUser = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    const code = `${name.slice(0, 3)}${lastName.slice(0, 3)}${birthday.slice(
      0,
      2
    )}`.toUpperCase();
    const response = await dispatch(postUser({ name, lastName, birthday, code }));
    console.log(response.data); 
  };

  return (
    <form  className={Styles["register-container"]} onSubmit={handleRegister}>
      <div className={Styles["name-input-container"]}>
        <label for="name">Nombre: </label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className={Styles["lastname-input-container"]}>
        <label for="lastName">Apellido: </label>
        <input type="text" id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      </div>
      <div className={Styles["birthday-input-container"]}>
        <label for="birthday">Fecha de cumpleaños: </label>
        <input type="date" id="birthday" value={birthday} onChange={(event) => setBirthday(event.target.value)} />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterUser;
