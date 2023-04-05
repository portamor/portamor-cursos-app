import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Certificate from './Certificate';

const DownloadCertificate = () => {
  const data = {
    name: 'Lizhana Campos ',
    tipo: 'pasaporte',
    dni: '12345678',
    cursoName: 'React PDF'
  };

  return (
    <div>
      <PDFDownloadLink
        document={<Certificate data={data} />}
        fileName="certificado.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Generando certificado...' : 'Descargar certificado'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadCertificate;


