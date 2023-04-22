import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../Redux/actions';
import styles from './UserList.module.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import usersImg from "../../images/users-icon.svg"
import { Trash } from "react-bootstrap-icons"

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
    <div className={styles["user-list-main"]}>
      <h2 className={styles.title}>Lista de usuarios registrados</h2>
      <div className={styles.info}>
        <img className={styles.picture} src={usersImg} alt="user-card" />
        <p>{totalUsers} Usuarios registrados</p>
      </div>
      <ul className={styles.list}>
        {users?.map((user, index) => (
          <li className={styles.item} key={user.id}>
            <h2 className={styles.cell}>{user.name} {user.lastName}</h2>
            <div className={styles.cell}>{user.birthday}</div>
            <Trash color='red' size={"25px"} onClick={() => handleDelete(user.id)} style={{cursor: "pointer"}} />
          </li>
        ))}
      </ul>
    </div>
  );

}

export default UsersList;
