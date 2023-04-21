import * as actions    from "../../Redux/actions";
import { Link }        from "react-router-dom";
import React           from "react";
import Styles          from "./CourseCard.module.css";
import { useDispatch } from "react-redux";
import { useEffect }   from "react";
import { useSelector } from "react-redux";
import Swal            from "sweetalert2";
import { Trash } from "react-bootstrap-icons"
import { Pen } from "react-bootstrap-icons"

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
        <div className={Styles["course-details-container"]}>
          <p>{courseDetail.duration}</p>
          <p>{courseDetail.level}</p>
        </div>
        <Link to={`/detalle-curso/${id}`} className={Styles["card-button"]}>
          Ver Más
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;