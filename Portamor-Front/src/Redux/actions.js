import axios from "axios"

export function getCourses() {
    return async function (dispatch) {
      try {
        var json = await axios.get("http://localhost:3001/courses");
        return dispatch({
          type: "GET_COURSES",
          payload: json.data,
        });
      } catch (error) {
        console.log("Error en getCourses/actions", error);
      }
    };
  }

  export function postUser (payload){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/users', payload);
        return response;
    }
  }
  export const getUserByCode = (code) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/users?code=${code}`);
      const user = response.data[0];
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(loginSuccess(user));
        return user;
      } else {
        return null;
      }
    } catch (error) {
      dispatch(loginFail(error.message));
      throw error;
    }
  };
  
  export const loginSuccess = (user) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(user));
    return {
      type: 'LOGIN_SUCCESS',
      payload: user,
    };
  };
  
  export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    return {
      type: 'LOGOUT',
    };
  };
  export const loginFail = (error) => ({
    type: 'LOGIN_FAIL',
    payload: error,
  });


  
