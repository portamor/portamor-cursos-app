import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../../Redux/actions';
import Styles from '../../RegisterUser/RegisterUser.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import Swal from 'sweetalert2';

const AddAdmin = ({ onSuccess }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [telephone, setTelephone] = useState('');
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

        if (isAdmin) {
            if (!telephone) {
                errors.telephone = 'Debe ingresar un número de teléfono celular';
                isValid = false;
            } else if (telephone.length < 9) {
                errors.telephone = "El numero de teléfono debe tener almenos 9 dígitos";
                isValid = false;
            } else if (!/^[0-9]+$/.test(telephone)) {
                errors.telephone = "El número de teléfono debe contener sólo números";
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    };

    const isValidDate = dateString => {
        const regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx)) return false;
        const d = new Date(dateString);
        const dNum = d.getTime();
        if (!dNum && dNum !== 0) return false;
        return d.toISOString().slice(0, 10) === dateString;
    };
    
    const isAdminBoolean = Boolean(isAdmin);


    const handleRegister = async event => {
        event.preventDefault();
        if (validateForm()) {
            const code = `${name.slice(0, 3)}${lastName.slice(0, 3)}${birthday.slice(
                0,
                2
            )}`.toUpperCase();
            try {
                const response = await dispatch(
                    postUser({ name, lastName, birthday, code, admin: isAdminBoolean, telephone })
                );
                
                const userCode = response.data.data.code;
                if (response !== null) {
                    Swal.fire({
                        icon: "success",
                        title: `Su código ${userCode}`,
                        text:
                            "Ese será su código para iniciar sesión, le recomendamos anotarlo",
                        showConfirmButton: false,
                        timer: 5000,
                    }).then(() => {
                        Swal.showValidationMessage("Presione Aceptar para continuar");
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Usuario registrado anteriormente",
                        text:
                            "Si usted se registró con anterioridad por favor inicie sesión con su código.",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error al registrar usuario",
                    text: "Ya existe un usuario con ese codigo, intente de nuevo",
                    confirmButtonText: "Aceptar",
                });
            }
        }
    };


    return (
        <form className={Styles["register-container"]} onSubmit={handleRegister}>
            <div className={Styles["name-input-container"]}>
                <label id="name">Nombre: </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                {formErrors.name && (
                    <p className={Styles["error-message"]}>{formErrors.name}</p>
                )}
            </div>
            <div className={Styles["lastname-input-container"]}>
                <label id="lastName">Apellido: </label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                />
                {formErrors.lastName && (
                    <p className={Styles["error-message"]}>{formErrors.lastName}</p>
                )}
            </div>
            <div className={Styles["birthday-input-container"]}>
                <label id="birthday">Fecha de cumpleaños: </label>

                <input
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(event) => setBirthday(event.target.value)}
                />
                {formErrors.brithday && (
                    <p className={Styles["error-message"]}>{formErrors.brithday}</p>
                )}

            </div>
            <div>
                <label>¿Es administrador?</label>
                <input
                    type="checkbox"
                    id="admin"
                    checked={isAdmin}
                    onChange={(event) => setIsAdmin(event.target.checked)}
                />

            </div>
            {
                isAdmin && (
                    <div className={Styles["lastname-input-container"]}>
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            id="telephone"
                            value={telephone}
                            onChange={(event) => setTelephone(event.target.value)}
                        />
                        {formErrors.telephone && (
                            <p className={Styles["error-message"]}>{formErrors.telephone}</p>
                        )}
                    </div>
                )
            }


            <CustomButton
                type={"submit"}
                content={"Registrarme"}
                primary={true}
                disabled={false}
            />
        </form>
    );

}

export default AddAdmin;