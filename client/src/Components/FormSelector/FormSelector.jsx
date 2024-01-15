import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import AddAdmin from "../Forms/AddAdmin/AddAdmin";
import UsersList from "../UsersList/UsersList";
import styles from "./FormSelector.module.css"
import CreateCourses from "../CreateCourse/CreateCourse";
import FormSection from "../Forms/CreateSection/FormSection";

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
        primary={selectedForm === "FormSection"}
        content={"Crear Seccion"} 
        onClick={() => handleFormSelection("FormSection")} />
      </div>

      {selectedForm === "addAdmin" && <AddAdmin />}
      {selectedForm === "userList" && <UsersList />}
      {selectedForm === "createCourse" && <CreateCourses />}
      {selectedForm === "FormSection" && <FormSection />}
    </div>
  );
};

export default FormSelector;
