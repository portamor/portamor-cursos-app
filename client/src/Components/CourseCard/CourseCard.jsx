import React           from "react";
import * as actions    from "../../Redux/actions";
import { Link }        from "react-router-dom";
import { Pen, Trash }         from "react-bootstrap-icons"
import PremiumIcon from '../PremiumIcon/PremiumIcon';
import { useDispatch, useSelector } from "react-redux";
import Swal            from "sweetalert2";
import Styles          from "./CourseCard.module.css";

const CourseCard = ({ id, title, image, isPaymentCourse }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAdmin = user?.admin;

  const hadleRemove = (e) => {
    e.preventDefault()
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar este curso?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actions.deleteCourse(id));
        Swal.fire(
          '¡Borrado!',
          'El curso ha sido borrado.',
          'success'
        ).then(() => {
          window.location.reload()
        });
      }
    });
  };

  return (
    <div className={Styles["course-card-main"]}>
      <div className={Styles["course-card"]}>
        <img src={image} alt="course-card" />
        {
          isAdmin && 
          <div className={Styles["admin-options"]}>
            <Link to={`/dashboard`} state={id} > 
              <Pen color="red" size={"25px"} style={{cursor: "pointer"}} />
            </Link> 
            <Trash color="red" size={"25px"} onClick={hadleRemove} style={{cursor: "pointer"}} />  
          </div>
        }
        <h3>{title}</h3>
        <Link to={`/detalle-curso/${id}`} className={Styles["card-button"]}>
          Ver Más
        </Link>
        {
          isPaymentCourse &&
          <div className={Styles["premium-icon-container"]}>
            <PremiumIcon />
          </div>
        }
      </div>
    </div>
  );
};

export default CourseCard;