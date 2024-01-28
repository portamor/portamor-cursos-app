import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditInstructor from "./EditInstructor";
import ChooseInstructor from "../../ChooseInstructor/ChooseInstructor";
import * as actions    from "../../../Redux/actions"
import styles from "../../Dashboard/Dashboard.module.css";

const InstructorList = () => {
  const dispatch = useDispatch();

  const instructorData = useSelector((state) => state?.courseInstructor);

  const handleInstructorById = (instructorId) => {
    dispatch(actions.getInstructorById(instructorId));
  };

  return (
    <div className={styles["instructor-container"]}>
      <EditInstructor instructorData={instructorData} />
      <ChooseInstructor editMode={true} handleInstructorById={handleInstructorById} instructorName={instructorData.name} />
    </div>
  );
};

export default InstructorList;