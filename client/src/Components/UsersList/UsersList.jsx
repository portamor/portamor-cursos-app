import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../Redux/actions';
import styles from './UserList.module.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import CustomButton from '../CustomButton/CustomButton';
import usersImg from "../../images/users-icon.svg"

function UsersList({ id }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.totaluser);

  const totalUsers = users ? users.length : 0;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    Swal.fire({
      title: 'Usuario Eliminado',
      icon: 'success',
      timer: 1800
    });
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 2000);
  };


  return (
    <div>
      <h2 className={styles.title}>Lista de usuarios registrados</h2>
      <div className={styles.info}>
        <img className={styles.picture} src={usersImg} alt="user-card" />
        <p>{totalUsers} Usuarios registrados</p>
      </div>
      <ul className={styles.list}>
        {users?.map((user, index) => (
          <li className={`${styles.item} ${index % 2 === 0 ? styles.gris : styles.rosa}`} key={user.id}>
            <div className={styles.cell}>{user.name}</div>
            <div className={styles.cell}>{user.lastName}</div>
            <div className={styles.cell}>{user.birthday}</div>
            <CustomButton content={"Eliminar Usuario ❌"} onClick={() => handleDelete(user.id)} className={styles.button} />
          </li>
        ))}
      </ul>
    </div>



  );

}

export default UsersList;
