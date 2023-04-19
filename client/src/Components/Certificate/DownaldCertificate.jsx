import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Certificate from './Certificate';
import { useSelector } from "react-redux";
import CustomButton from '../CustomButton/CustomButton';
import styles from './DownloadCertificate.module.css'

const DownloadCertificate = ({title}) => {
  const user = useSelector((state)=> state?.user)
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [isReadyToGenerate, setIsReadyToGenerate] = useState(false);

  const handleIdentificacion = (event) => {
    const { name, value } = event.target;
    if (name === "tipo_identificacion") {
      setTipoIdentificacion(value);
    } else {
      setNumeroIdentificacion(value);
    }
  };

  const handleGuardarClick = () => {
    setIsReadyToGenerate(true);
  };

  const data = {
    name: `${user.name} ${user.lastName}` ,
    tipo: tipoIdentificacion,
    numero: numeroIdentificacion,
    title: title
  };

  return (
    <div className={styles.form} >
      <div className={styles["cards-container"]} >
  <p className={styles.labeltwo} >Para solicitar certificado ingresa tu identificación oficial.</p>
  </div> 
  <br />
      <div className={styles.input_container} >
        <label htmlFor="tipo_identificacion" className={styles.label} >Tipo de identificación oficial:</label>
        <select
          id="tipo_identificacion"
          name="tipo_identificacion"
          value={tipoIdentificacion}
          onChange={handleIdentificacion}
          className={styles.select}
        >
          <option value="">Seleccione una opcion</option>
          <option value="dni">DNI</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="credencial_escolar">Credencial escolar</option>
        </select>
        <input
          type="text"
          placeholder="Numero de identificacion "
          name="numero_identificacion"
          value={numeroIdentificacion}
          onChange={handleIdentificacion}
          className={styles.input}
        />
        <CustomButton  
        onClick={handleGuardarClick} 
        type="button" 
        content={"Guardar"} />
      </div>
      <div className={styles.pdf} >
      {isReadyToGenerate && (
        <button className={styles.buttonDesc} >
        <PDFDownloadLink
          document={<Certificate tipo={data.tipo} numero={data.numero} name={data.name} title={title} />}
          fileName="certificado.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Generando certificado...' : 'Descargar certificado'
          }
        </PDFDownloadLink>
      </button>
      )}
    </div>
    </div>
  );
};


export default DownloadCertificate;


