import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../CustomButton/CustomButton";
import styles from "./formPayment.module.css";

const FormPayment = ({ handleInscriptionClick }) => {
  const { register, handleSubmit, reset } = useForm();
  const [formValues, setFormValues] = useState({
    telephone: null,
    holderPaymentMethod: null
  });

  const onSubmit = (data) => {
    handleInscriptionClick(data)
  };

  return (
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
              holderPaymentPethod: e.target.value,
            })}
        />
      </div>

      <CustomButton
        disabled={true}
        type={"submit"}
        primary={false}
        content={"Inscribirme"}
      />
    </form>
  );
};

export default FormPayment;
