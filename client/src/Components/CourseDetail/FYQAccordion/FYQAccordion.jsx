
import {AccordionSummary} from '@mui/material';
import { Accordion }      from '@mui/material';
import ExpandMoreIcon     from "@mui/icons-material/ExpandMore";
import React              from 'react';
import styles             from "./FYQ.module.css";

const FYQ = () => {

  return (
    <div>
      <Accordion className={styles["course-accordion"]} >
        <AccordionSummary 
        style={{ "backgroundColor": '#ffffff' }} 
        expandIcon={<ExpandMoreIcon />}  >
          
          <div className={styles["course-accordion-summary-content"]}>
            <h2>¿Tengo acceso ilimitado a las clases?</h2>
          </div>
        </AccordionSummary>
        <span className={styles["answer"]}>
          ¡Sí! Luego de que te inscribas al curso vas a poder acceder a las clases cuando y donde quieras. El curso se queda en tu cuenta.
        </span>
      </Accordion>
      
      <Accordion className={styles["course-accordion"]} >
        <AccordionSummary 
        style={{ "backgroundColor": '#ffffff' }} 
        expandIcon={<ExpandMoreIcon />} 
        className={styles["course-accordion-summary"]} >
          
          <div className={styles["course-accordion-summary-content"]}>
            <h2>¿Cuándo inicia el curso?</h2>
          </div>
        </AccordionSummary>
        Todo el contenido es 100% en línea, con clases pregrabadas a las que tendrás acceso luego de la compra del curso. ¡Puedes iniciarlo y desarrollarlo a tu propio ritmo!
      </Accordion>
      
      
      <Accordion className={styles["course-accordion"]} >
        <AccordionSummary 
        style={{ "backgroundColor": '#ffffff' }} 
        expandIcon={<ExpandMoreIcon />} 
        className={styles["course-accordion-summary"]} >
          
          <div className={styles["course-accordion-summary-content"]}>
            <h2>¿Cómo obtengo el certificado del curso?</h2>
          </div>
        </AccordionSummary>
        Luego de que termines el curso, podras acceder a tu certificado para que lo descargues desde tu cuenta
      </Accordion>
    </div>
  );
};

export default FYQ;