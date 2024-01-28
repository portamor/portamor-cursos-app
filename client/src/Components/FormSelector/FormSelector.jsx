import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import AddAdmin from "../Forms/AddAdmin/AddAdmin";
import UsersList from "../UsersList/UsersList";
import CreateCourses from "../CreateCourse/CreateCourse";
import InstructorList from "../Forms/EditInstructor/InstructorList";
import styles from "./FormSelector.module.css"

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState("createCourse");

  const handleFormSelection = (form) => {
    setSelectedForm(form);
  };

  return (
    <div className={styles["form-selector-main"]}>
      <div className={styles.containerFormSelector}>
        <CustomButton 
        primary={selectedForm === "addAdmin"}
        content={"Crear Administrador"} 
        onClick={() => handleFormSelection("addAdmin")} />
        <CustomButton 
        primary={selectedForm === "userList"}
        content={"Usuarios Registrados"} 
        onClick={() => handleFormSelection("userList")} />
        <CustomButton 
        primary={selectedForm === "createCourse"}
        content={"Crear Curso"} 
        onClick={() => handleFormSelection("createCourse")} />
        <CustomButton
        primary={selectedForm === "instructorList"}
        content={"Editar Instructor"}
        onClick={() => handleFormSelection("instructorList")} />
      </div>

      {selectedForm === "addAdmin" && <AddAdmin />}
      {selectedForm === "userList" && <UsersList />}
      {selectedForm === "createCourse" && <CreateCourses />}
      {selectedForm === "instructorList" && <InstructorList />}
    </div>
  );
};

export default FormSelector;
