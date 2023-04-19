import React, { useState } from "react";
import { CreateCourse } from "../Forms";
import { CreateInstructor } from "../Forms";
import { CreateSection } from "../Forms";
import { CreateVideo } from "../Forms";
import CustomButton from "../CustomButton/CustomButton";
import AddAdmin from "../Forms/AddAdmin/AddAdmin";
import UsersList from "../UsersList/UsersList";
import styles from "./FormSelector.module.css"

const FormSelector = () => {
  const [selectedForm, setSelectedForm] = useState("createCourse");

  const handleFormSelection = (form) => {
    setSelectedForm(form);
  };

  return (
    <div>
   <div className={styles.containerFormSelector}>
  <CustomButton content={"Create Course"} onClick={() => handleFormSelection("createCourse")}/>
  <CustomButton content={"Create Instructor"} onClick={() => handleFormSelection("createInstructor")}/>
  <CustomButton content={"Create Section"} onClick={() => handleFormSelection("createSection")}/>
  <CustomButton content={"Create Video"} onClick={() => handleFormSelection("createVideo")}/>
  <CustomButton content={"Crear Administrador"} onClick={() => handleFormSelection("addAdmin")}/>
  <CustomButton content={"Usuarios Registrados"} onClick={() => handleFormSelection("userList")}/>
</div>


      {selectedForm === "createCourse" && <CreateCourse />}
      {selectedForm === "createInstructor" && <CreateInstructor />}
      {selectedForm === "createSection" && <CreateSection />}
      {selectedForm === "createVideo" && <CreateVideo />}
      {selectedForm === "addAdmin" && <AddAdmin />}
      {selectedForm === "userList" && <UsersList />}
    </div>
  );
};

export default FormSelector;
