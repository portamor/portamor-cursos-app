import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Certificate from './Certificate';
import { useSelector } from "react-redux";
import CustomButton from '../CustomButton/CustomButton';
import Styles from './certificate.module.css'


const DownloadCertificate = ({title}) => {
  const user = useSelector((state)=> state?.user)
  const [tipoIdentificacion, setTipoIdentificacion] = useState('');
  const [numeroIdentificacion, setNumeroIdentificacion] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [isReadyToGenerate, setIsReadyToGenerate] = useState(false);
  const fechaActual = new Date();
  const mesNombre = fechaActual.toLocaleString('es-ES', { month: 'long' });
  const dia = fechaActual.getDate();
  const anio = fechaActual.getFullYear();
  const fechaActualString = `${dia} de ${mesNombre} del ${anio}`;

  console.log(title, 'titlee');

  const handleIdentificacion = (event) => {
    const { name, value } = event.target;
    if (name === "tipo_identificacion") {
      setTipoIdentificacion(value);
    }
    if(name === "nombre_completo"){
      setNombreCompleto(value)
    }
    if(name === "numero_identificacion") {
      setNumeroIdentificacion(value);
    }
  };

  const handleGuardarClick = () => {
    setIsReadyToGenerate(true);
  };

  const data = {
    name: nombreCompleto ,
    tipo: tipoIdentificacion,
    numero: numeroIdentificacion,
    title: title,
    fecha: fechaActualString
  };

  return (
    <div className={Styles.form} >
      <div className={Styles.input_container}  >
<p className={Styles.labeltwo} >Para solicitar certificado ingresa tu nombre completo y opcionalmente puedes agregar tu numero de documento oficial.</p>
</div> 
<br />
      <div className={Styles.input_container} >
      <input
          type="div"
          placeholder="Nombre completo"
          name="nombre_completo"
          value={nombreCompleto}
          onChange={handleIdentificacion}
          className={Styles.input}
        />
        <label htmlFor="tipo_identificacion" className={Styles.labelIdentification} >Tipo de identificación oficial:</label>
        <select
          id="tipo_identificacion"
          name="tipo_identificacion"
          value={tipoIdentificacion}
          onChange={handleIdentificacion}
          className={Styles.selectC}
        >
          <option value="">Selecciona una identificacion</option>
          <option value="dni">DNI</option>
          <option value="pasaporte">Pasaporte</option>
          <option value="credencial_escolar">Credencial escolar</option>
        </select>
        <input
          type="div"
          placeholder="Numero de identificacion "
          name="numero_identificacion"
          value={numeroIdentificacion}
          onChange={handleIdentificacion}
          className={Styles.input}
        />

        <CustomButton  
        onClick={handleGuardarClick} 
        type="button" 
        content={"Guardar"} />
      </div>
      <div className={Styles.input} >
      {isReadyToGenerate && (
          <>
          <p className={Styles.labeltwo} > Vista Previa</p>
            <div className={Styles.pageCert} >
              <div className={Styles.sectionCert} >
        <div className={Styles.titleCert} >Certifica que</div>
        <div className={Styles.nameCert} >{data.name}</div>
        {data.numero? (<div>Documento oficial {data.tipo} : {data.numero} </div>) : ''}
        <div  > culmino el curso en linea </div>
        <div className={Styles.nameCert}>{data.title}</div>
        <div className={Styles.descriptionCert} >
          Reconociendo su excelente desempeño en la realización de tareas y cumplimiento de objetivos del curso.
        </div>
        <div>FIRMA: </div>
        <div className={Styles.dateCert} >Fecha de emisión </div>
        <div className={Styles.dateCertT} >{data.fecha}</div>
        </div >
            </div>
        <button className={Styles.buttonDesc} >
        <PDFDownloadLink
          document={<Certificate tipo={data.tipo} numero={data.numero} name={data.name} title={title} fecha={data.fecha} />}
          fileName="certificado.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Generando certificado...' : 'Descargar certificado'
          }
        </PDFDownloadLink>
      </button>
      </>
      )}
    </div>
    </div>
  );
};


export default DownloadCertificate;