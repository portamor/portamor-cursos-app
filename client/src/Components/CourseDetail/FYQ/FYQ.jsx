
import {AccordionSummary} from '@mui/material';
import { Accordion }      from '@mui/material';
import ExpandMoreIcon     from "@mui/icons-material/ExpandMore";
import { Link }           from 'react-router-dom';
import React              from 'react';
import styles             from "./FYQ.module.css";

const CourseAccordion = ({ sections, courseId }) => {

  return (
    <div>
      <AccordionSummary
      className={styles["course-accordion-head"]}
      style={{"background-color": '#f3f1f1'}} >
        Contenido del curso
      </AccordionSummary>
      
      {sections && sections.map(section => {
        return (
          <Accordion 
          key={section.id}
          className={styles["course-accordion"]} >
            <AccordionSummary 
            style={{"background-color": '#f3f1f1'}} 
            expandIcon={<ExpandMoreIcon />} 
            className={styles["course-accordion-summary"]} >
              <div className={styles["course-accordion-summary-content"]}>
                <h2>{section.name}</h2>
                <span>{section.Videos.length} clases</span>
              </div>
            </AccordionSummary>
          </Accordion>
      )})}

    </div>
  );
};

export default CourseAccordion;