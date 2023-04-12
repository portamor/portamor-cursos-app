// React
import React       from 'react';
import { Link } from 'react-router-dom';
//Material-ui
import {AccordionSummary} from '@mui/material';
import { Accordion }      from '@mui/material';
import ExpandMoreIcon     from "@mui/icons-material/ExpandMore";
//Styles
import styles from "./CourseAccordion.module.css"
// svg
import img from "../../images/ver-video.svg"

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
            <ol>
              {section.Videos && section.Videos.map((video) => (
                <li key={video.id} className={styles["course-accordion-li"]}>
                  <div className={styles["course-accordion-li-div"]}>
                    <Link 
                    to={`/clase/${courseId}/${video.id}`}
                    className={styles["course-accordion-class-link"]} >
                      {video.videoTitle}
                    </Link>
                    <Link 
                    to={`/clase/${courseId}/${video.id}`}
                    className={styles["course-accordion-class-link"]} >
                      <img src={img} alt="sd"/>
                    </Link>
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