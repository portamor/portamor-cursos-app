import React, { useState } from "react";
import FormCourse from "./FormCourse";

const Dashboard = () => {

    const [formularioActual, setFormularioActual] = useState(null);


    return (
        <div>
            <button onClick={() => setFormularioActual("A")} >Crear Curso</button>
            <button onClick={() => setFormularioActual("B")} >Crear Seccion</button>
            <button onClick={() => setFormularioActual("C")} >Añadir Video</button>

            <div>
                {formularioActual === 'A' && <FormCourse /> }

            </div>
            
            
        </div>
    )

}

export default Dashboard;