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
  
