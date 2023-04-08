import axios          from "axios";
import * as actions   from "../constants/actionsContants"
import * as constants from "../constants";

export function getCourses() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/courses");
      return dispatch({
        type: "GET_COURSES",
        payload: json.data.data,
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

export function getVideoById(id) {
  return async function (dispatch) {
    try {
      const foundVideo = await axios.get(`http://localhost:3001/videos/${id}`);

      return dispatch({ type: actions.GET_VIDEO_BY_ID, payload: foundVideo.data.data });
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
};

export function createCourse(payload, setActualForm) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/courses", payload)

      alert('Se ha creado el curso correctamente')
      
      //Change form in dashboard
      setActualForm(constants.SELECT_INSTRUCTOR_FORM);

      return dispatch({ type: actions.CREATE_COURSE , payload: response.data.data })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export function createSection(name, courseId) {
  return async function (dispatch) {
    try {
      const createdSection = await axios.post(`http://localhost:3001/section/${courseId}`,{name} )

      alert(`La sección ${createdSection.data.data.name} se ha creado con éxito`);

      return dispatch({ type: actions.CREATE_SECTION, payload: createdSection.data.data })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const getSectionInCreatedSections = (sectionId) => {
  return async function (dispatch) {
    try {
      return dispatch({ type: actions.GET_SECTION_IN_CREATED_SECTIONS, payload: sectionId })
    } catch (error) {
      console.log(error.message);
    }
  }
};

export function createVideo(payload, sectionId) {
  return async (dispatch) => {
    try {
      const createdVideo = await axios.post(`http://localhost:3001/videos/${sectionId}`, payload);

      dispatch({ type: actions.CREATE_VIDEO, payload: createdVideo.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createInstructor(payload, setActualForm) {
  return async (dispatch) => {
    try {
      const createdInstructor = await axios.post(`http://localhost:3001/instructor`, {
        name:            payload.name,
        description:     payload.description,
        profile_picture: payload.profile_picture,
        score:           payload.score,
        reviews:         payload.reviews,
        courseId:        payload.courseId
      });

      alert(`Instructor ${createdInstructor.data.data.name} creado con exito`)

      setActualForm(constants.SELECT_SECTION_FORM);

      dispatch({ type: actions.CREATE_INSTRUCTOR, payload: createdInstructor.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function addInstructorToCourse(instructorId, courseId, setActualForm) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/instructor/add-course/${instructorId}`, {
        courseId: courseId 
      })

      alert(response.data.message)

      setActualForm(constants.SELECT_SECTION_FORM);

      dispatch({ type: actions.ADD_INSTRUCTOR_TO_COURSE, payload: response.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function createReview(payload) {
  return async (dispatch) => {
    try {
      const createdReview = await axios.post("http://localhost:3001/review", payload);

      dispatch({ type: actions.CREATE_REVIEW, payload: createdReview.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getAllInstructors(payload) {
  return async (dispatch) => {
    try {
      const foundInstructors = await axios.get("http://localhost:3001/instructor")

      dispatch({ type: actions.GET_ALL_INSTRUCTORS, payload: foundInstructors.data.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
