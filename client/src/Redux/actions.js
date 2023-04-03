import axios        from "axios";
import * as actions from "../constants"

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
      const courseDetail = await axios.get(`http://localhost:3001/courses/id/${id}`);

      return dispatch({ type: actions.GET_COURSE_DETAIL, payload: courseDetail.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getSectionsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundSections = await axios.get(`http://localhost:3001/section/course/${courseId}`);

      return dispatch({ type: actions.GET_SECTIONS_BY_COURSE_ID, payload: foundSections.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getReviewsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundReviews = await axios.get(`http://localhost:3001/review/${courseId}`);

      return dispatch({ type: actions.GET_REVIEWS_BY_COURSE_ID, payload: foundReviews.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getInstructorById(id) {
  return async function (dispatch) {
    try {
      const foundInstructor = await axios.get(`http://localhost:3001/instructor/${id}`);

      return dispatch({ type: actions.GET_INSTRUCTOR_BY_ID, payload: foundInstructor.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getUsersByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundUsers = await axios.get(`http://localhost:3001/users/course/${courseId}`);

      return dispatch({ type: actions.GET_USERS_BY_COURSE_ID, payload: foundUsers.data.data });
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
