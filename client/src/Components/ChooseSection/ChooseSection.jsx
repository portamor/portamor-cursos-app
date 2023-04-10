
import * as actions    from "../../Redux/actions"
import * as constans   from "../../constants"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React           from "react";
import SectionCard     from "../SectionCard/SectionCard";
import styles          from "./ChooseSection.module.css";

const ChooseSectionToAddVideo = ({ setActualForm }) => {
  const dispatch        = useDispatch()
  const createdCourse   = useSelector(state => state.createdCourse);
  const createdSections = useSelector(state => state.createdSections);
  
  const handleAddVideoButton = (sectionId) => {
    dispatch(actions.getSectionInCreatedSections(sectionId));
    setActualForm(constans.SELECT_VIDEO_FORM);
  };

  return (
    <div className={styles["choose-sections-main"]}>
      <h1>Secciones creadas para el curso {createdCourse.name}</h1>
      {
        createdSections.map(section => 
          <SectionCard 
          key={section.id}
          name={section.name}
          onClick={() => handleAddVideoButton(section.id)} />
        )
      }
    </div>
  )
}

export default ChooseSectionToAddVideo;