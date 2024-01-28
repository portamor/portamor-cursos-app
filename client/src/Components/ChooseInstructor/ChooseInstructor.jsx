import React           from "react";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserCard        from "../UserCard/UserCard";
import styles          from "./ChooseInstructor.module.css"
import * as actions    from "../../Redux/actions"

const ChooseInstructor = ({ setActualForm, editMode, handleInstructorById, instructorName }) => {
  const dispatch = useDispatch();

  const allInstructors = useSelector(state => state.allInstructors);
  const createdCourse  = useSelector(state => state.createdCourse);

  useEffect(() => {
    dispatch(actions.getAllInstructors()); 
  },[dispatch, instructorName]);
  
  const handleSelectInstructorToCourse = (instructorId) => {
    dispatch(actions.addInstructorToCourse(instructorId, createdCourse.id, setActualForm));
  };

  const handleInstructorByIdOnChoose = (instructorId) => {
    handleInstructorById(instructorId);
  };

  return (
    <div className={styles["choose-instructor-main"]}>
      <h1>Elige un instructor</h1>
      {
        allInstructors.map(instructor => 
          <UserCard 
          name={instructor.name} 
          key={instructor.id}
          image={instructor.profile_picture} 
          instructor={true}
          onClick={() => (
            editMode ? handleInstructorByIdOnChoose(instructor.id)
            : handleSelectInstructorToCourse(instructor.id)
          )}
          description={instructor.description}
          editMode={editMode} />  
        )
      }
    </div>
  )
}

export default ChooseInstructor;