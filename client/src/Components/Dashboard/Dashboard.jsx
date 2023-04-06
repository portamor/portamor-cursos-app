import React, { useState } from "react";
import FormCourse from "./FormCourse";
import FormSectionCreate from "./FormSection";
import styles from './formCourse.module.css'

const Dashboard = () => {

    const [formularioActual, setFormularioActual] = useState(null);


    return (
        <div className={styles.div_dashboard} >
            <div>
            <button className={styles.button_d} onClick={() => setFormularioActual("A")} >Crear Curso</button>
            <button className={styles.button_d} onClick={() => setFormularioActual("B")} >Crear Seccion</button>
            <button className={styles.button_d} onClick={() => setFormularioActual("C")} >Añadir Video</button>
        </div>

                {formularioActual === 'A' && <FormCourse /> }
                {formularioActual=== 'B' && <FormSectionCreate />}


            
            
        </div>
    )

}

export default Dashboard;