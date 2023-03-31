import axios from "axios";
export const GET_COURSE_DETAIL = "GET_COURSE_DETAIL";
export const GET_SECTIONS_BY_COURSE_ID = "GET_SECTIONS_BY_COURSE_ID";

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

export function getCourseDetail(id) {
  return async function (dispatch) {
    try {
      var courseDetail = await axios.get(`http://localhost:3001/courses/id/${id}`);

      return dispatch({ type: GET_COURSE_DETAIL, payload: courseDetail.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getSectionsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      var foundSections = await axios.get(`http://localhost:3001/section/course/${courseId}`);

      return dispatch({ type: GET_SECTIONS_BY_COURSE_ID, payload: foundSections.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/users", payload);
    return response;
  };
}
