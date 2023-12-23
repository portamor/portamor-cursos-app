import styles from './CoursePayment.module.css';
import YapeQR from '../../../images/yapeQR.png';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import CustomButton from "../../CustomButton/CustomButton";

const CoursePayment = ({handleInscriptionClick}) => {
  const { register, handleSubmit, reset } = useForm();

  const [formValues, setFormValues] = useState({
    telephone: null,
    holderPaymentMethod: null
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formValues.telephone || formValues.telephone === '') {
        errors.telephone = 'Debe ingresar un número de teléfono celular';
        isValid = false;
    } else if (formValues.telephone.length < 9) {
        errors.telephone = "El numero de teléfono debe tener almenos 9 dígitos";
        isValid = false;
    } else if (!/^[0-9]+$/.test(formValues.telephone)) {
        errors.telephone = "El número de teléfono debe contener sólo números";
        isValid = false;
    }

    if (!formValues.holderPaymentMethod || formValues.holderPaymentMethod === '') {
      errors.holderPaymentMethod = 'Debe ingresar un el nombre del titular del número de teléfono celular';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  }

  const onSubmit = (data) => {
    validateForm() && handleInscriptionClick(data)
    reset()
  };

  return (
    <div className={styles.course_payment_box}>
      <h2>Inscribete a este curso pagando por Yape o Plin</h2>
      <p>Una vez finalizado el pago, ingrese su información, y seleccione botón <strong>"Inscribirme"</strong></p>
      <div className={styles.form_paymentMethod}>
        <div className={styles.form_qr}>
          <img src={YapeQR} alt='Yape QR' />
        </div>
        <div className={styles.form_information}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.input_container}>
            <input
              type="text"
              id="telephone"
              {...register("telephone", { required: "Este campo es requerido" })}
              className={styles.input}
              placeholder="Número de Celular"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  telephone: e.target.value,
                })}
            />
            {formErrors.telephone && (
              <p className={styles["error-message"]}>{formErrors.telephone}</p>
            )}
          </div>
      
          <div className={styles.input_container}>
            <input
              type="text"
              id="holderPaymentMethod"
              {...register("holderPaymentMethod", { required: "Este campo es requerido" })}
              className={styles.input}
              placeholder="Nombre del titular del celular"
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  holderPaymentMethod: e.target.value,
                })}
            />
            {formErrors.holderPaymentMethod && (
            <p className={styles["error-message"]}>{formErrors.holderPaymentMethod}</p>
          )}
          </div>

          <CustomButton
            disabled={false}
            type={"submit"}
            primary={true}
            content={"Inscribirme"}
          />
        </form>
        </div>
      </div>
    </div>
  );
};

export default CoursePayment;

// activa btón de inscripción una vez llenados los datos del formulario de pago