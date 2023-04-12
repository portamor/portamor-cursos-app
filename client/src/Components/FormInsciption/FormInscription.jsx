import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Styles from "./FormInscription.module.css"


const FormInscription = ({ courseId, accessToken, onCloseModal }) => {
  const [formData, setFormData] = useState({
    userId: '',
    userCode: ''
  });

  const courseDetail = useSelector((state) => state.courseDetail);
  const user = useSelector((state) => state.user);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value, userId: user.id });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { userId } = formData;
      const response = await fetch(`http://localhost:3001/users/inscription/${userId}/${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log(response.ok);
        Swal.fire({
          title: 'Inscripción exitosa',
          text: `${user.name} se ha inscripto al curso ${courseDetail.title}`,
          icon: 'success',
        });
        onCloseModal();
      } else {
        Swal.fire({
          title: 'Error en la inscripción',
          text: 'Hubo un error al inscribir al usuario al curso',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error en la inscripción',
        text: 'Hubo un error al inscribir al usuario al curso',
        icon: 'error',
      });
    }
  };

  return (
    <form className={Styles['inscription-container']} onSubmit={handleSubmit}>
      <div className={Styles['input-container']}>
        <label htmlFor="userCode">Código de usuario:</label>
        <input type="text" name="userCode" id="userCode" value={formData.userCode} onChange={handleInputChange} />
      </div>

      <button className={Styles['button-inscription']} type="submit">Inscribirse</button>
    </form>
  );
};

export default FormInscription;
