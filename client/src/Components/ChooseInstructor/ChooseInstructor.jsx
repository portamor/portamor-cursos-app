import React           from "react";
import { useEffect }   from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import UserCard        from "../UserCard/UserCard";
import styles          from "./ChooseInstructor.module.css"
import * as actions    from "../../Redux/actions"


const ChooseInstructor = ({ setActualForm }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getAllInstructors());
  },[dispatch]);
  
  const allInstructors = useSelector(state => state.allInstructors);
  const createdCourse  = useSelector(state => state.createdCourse);
  
  const handleSelectInstructorToCourse = (instructorId) => {
    dispatch(actions.addInstructorToCourse(instructorId, createdCourse.id, setActualForm));
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
          onClick={() => handleSelectInstructorToCourse(instructor.id)}
          description={instructor.description} />  
        )
      }
    </div>
  )
}

export default ChooseInstructor;