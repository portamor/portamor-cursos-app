import * as actions    from "../../Redux/actions";
import { Link }        from "react-router-dom";
import React           from "react";
import Styles          from "./CourseCard.module.css";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import Swal            from "sweetalert2";

const CourseCard = ({ id, title, image }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAdmin = user?.admin;
  const courseDetail = useSelector((state) => state?.courseDetail);

  useEffect(() => {
    dispatch(actions.getCourseDetail(id));
  }, [dispatch, id])

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
          <h3>{title}</h3>
          <div className={Styles["course-details-container"]}>
            <p>{courseDetail.duration}</p>
            <p>{courseDetail.level}</p>
          </div>
          <Link to={`/detalle-curso/${id}`} className={Styles["card-button"]}>
            Ver Más
          </Link>
          <br />
          { isAdmin && ( <Link to={`/dashboard`} className={Styles["card-button"]} state={id} >  Editar   
        </Link> 
        )}
        <br />
          { isAdmin && ( <button className={Styles["card-button"]} onClick={hadleRemove} >  Eliminar curso   
        </button> 
        )}
        </div>
    </div>
  );
};

export default CourseCard;