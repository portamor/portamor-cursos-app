import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import AddAdmin from "../Forms/AddAdmin/AddAdmin";
import UsersList from "../UsersList/UsersList";
import styles from "./FormSelector.module.css"
import CreateCourses from "../CreateCourse/CreateCourse";

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState("createCourse");




  const handleFormSelection = (form) => {
    setSelectedForm(form);
  };


  return (
    <div>
      <div className={styles.containerFormSelector}>
        <CustomButton content={"Crear Administrador"} onClick={() => handleFormSelection("addAdmin")} />
        <CustomButton content={"Usuarios Registrados"} onClick={() => handleFormSelection("userList")} />
        <CustomButton content={"Crear Curso"} onClick={() => handleFormSelection("createCourse")} />
      </div>

      {selectedForm === "addAdmin" && <AddAdmin />}
      {selectedForm === "userList" && <UsersList />}
      {selectedForm === "createCourse" && <CreateCourses />}
    </div>
  );
};

export default FormSelector;
