import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import bg from './bg.png'

Font.register({
  family: 'Alkatra',
  src: 'https://fonts.googleapis.com/css2?family=Alkatra:wght@500&display=swap'
});


const styles = StyleSheet.create({
  page: {
    padding: '0px',
    fontFamily: 'Helvetica',
    fontSize: 12,
    position: 'relative',
    textAlign: 'center'
  },
  section: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 120,
  },
  logo: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica-BoldOblique',
    marginBottom: 2,
  },
  description: {
    margin: 25,
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    textAlign: 'right',
    marginRight: 15,
    marginTop: 50,
  },
  dateS: {
    fontSize: 14,
    textAlign: 'right',
    marginRight: 15,
  },
});



const Certificate = ({data}) => {
 
  const fechaActual = new Date();
  const mesNombre = fechaActual.toLocaleString('es-ES', { month: 'long' });
  const dia = fechaActual.getDate();
  const anio = fechaActual.getFullYear();
  const fechaActualString = `${dia} de ${mesNombre} del ${anio}`;
  console.log(fechaActualString);
  
  return (
  <Document >
    <Page size="A4" style={styles.page} orientation='landscape'> 
      <View style={styles.section}>
        <Image style={styles.logo} src={bg} />
        <Text style={styles.title}>Certifica que</Text>
        <Text style={styles.name} >{data.name}</Text>
        {data.dni? (<Text>Documento oficial {data.tipo}:{data.dni}</Text>) : ''}
        <Text style={styles.description} > culmino el curso en linea </Text>
        <Text style={styles.name}>{data.cursoName}</Text>
        <Text style={styles.description}>
          Reconociendo su excelente desempeño en la realización de tareas y cumplimiento de objetivos del curso
        </Text>
        <Text>FIRMA: </Text>
        <Text style={styles.date}>Fecha de emisión </Text>
        <Text style={styles.dateS} >{fechaActualString}</Text>

      </View>
    </Page>
  </Document>
);
}
export default Certificate;

