// React
import React       from 'react';
import { NavLink } from 'react-router-dom';
//Material-ui
import {AccordionSummary} from '@mui/material';
import { Accordion }      from '@mui/material';
import ExpandMoreIcon     from "@mui/icons-material/ExpandMore";
//Styles
import styles from "./CourseAccordion.module.css"
// svf
import img from "./ver-video.svg"

const CourseAccordion = ({ sections }) => {

  return (
    <div>
      <AccordionSummary
      className={styles["course-accordion-head"]}
      style={{"background-color": '#f3f1f1'}} >
        Contenido del curso
      </AccordionSummary>
      {sections.map(section => {
        //All section's minutes to "AccordionSummary"
        let totalMinutesSection = 0;
        for (const cls of section.classes) {
          if(cls.minutes !== undefined) totalMinutesSection += cls.minutes
        }

        return (
          <Accordion 
          key={section.id}
          className={styles["course-accordion"]} >
            <AccordionSummary 
            style={{"background-color": '#f3f1f1'}} 
            expandIcon={<ExpandMoreIcon />} 
            className={styles["course-accordion-summary"]} >
              <div className={styles["course-accordion-summary-content"]}>
                <h2>{section.title}</h2>
                <span>{section.classes.length} clases</span>
                <span>{totalMinutesSection} min</span>
              </div>
            </AccordionSummary>
            <ol>
              {section.classes.map((cls) => (
                <li key={cls.id} className={styles["course-accordion-li"]}>
                  <div className={styles["course-accordion-li-div"]}>
                    <NavLink 
                      to={`clase/${cls.id}`}
                      className={styles["course-accordion-class-link"]} >
                        {cls.title}
                    </NavLink>
                    <NavLink 
                      to={`clase/${cls.id}`}
                      className={styles["course-accordion-class-link"]} >
                        <img src={img} alt="sd"/>
                    </NavLink>
                  </div>
                </li>
              ))}
            </ol>
          </Accordion>
      )})}
    </div>
  );
};

export default CourseAccordion;