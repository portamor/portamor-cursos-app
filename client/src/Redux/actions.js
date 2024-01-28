import axios          from "axios";
import * as actions   from "../constants/actionsContants"
import * as constants from "../constants";
import Swal from "sweetalert2";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export function getCourses(page, size) {
  return async function (dispatch) {
    dispatch({ type: actions.GET_COURSES_LOADING })
    try {
      const { data } = await axios.get(`/courses?page=${page}&size=${size}`);

      return dispatch({
        type: actions.GET_COURSES,
        payload: {
          data:         data.data,
          currentPage:  data.meta.currentPage,
          pageSize:     data.meta.pageSize,
          totalCourses: data.meta.totalCourses,
          totalPages:   data.meta.totalPages,
        },
      });
    } catch (error) {
      return dispatch({
        type: actions.GET_COURSES,
        payload: {
          data: [],
        },
      });
    }
  };
}

export const getUsersById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/users/${id}`);
    dispatch({ type: 'GET_USERS_ID', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'GET_USERS_ID', payload: {} });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`/users`);
    dispatch({ type: 'GET_USERS_SUCCESS', payload: response.data.data });
  } catch (error) {
    dispatch({ type: 'GET_USERS_SUCCESS', payload: [] });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/users/${userId}`);
    dispatch({ type: 'DELETE_USER_SUCCESS', payload: response.data.message });
  } catch (error) {
    return;
  }
};

export const inscribeUser = (userId, courseId, accessToken, user, courseDetail, payload) => async () => {
  try {
    const response = await axios.post(`/inscriptions/${userId}/${courseId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        message: response.data.message,
      };
    } else {
      throw new Error('Hubo un error al inscribir al usuario al curso');
    }
  } catch (error) {
    throw new Error('Hubo un error al inscribir al usuario al curso');
  }
};

export function getCourseDetail(courseId) {
  return async function (dispatch) {
    try {
      const courseDetail = await axios.get(`/courses/id/${courseId}`);

      return dispatch({ type: actions.GET_COURSE_DETAIL, payload: courseDetail.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_COURSE_DETAIL, payload: {} });
    }
  };
};

export function getVideosCourse(id) {
  return async function (dispatch) {
    try {
      const videosOfCourse = await axios.get(
        `/courses/videos/${id}`
      );
      return dispatch({ type: actions.GET_VIDEOS_COURSE, payload: videosOfCourse.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_VIDEOS_COURSE, payload: [] });
    }
  };
};

export function getCoursesOfUser(userId) {
  return async function (dispatch) {
    dispatch({ type: actions.GET_COURSES_LOADING })
    try {
      const foundCourses = await axios.get(`/users/my-courses/${userId}`);

      return dispatch({ type: actions.GET_COURSES_OF_USER, payload: foundCourses.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_COURSES_OF_USER, payload: [] });
    }
  };
}

export function getSectionsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundSections = await axios.get(`/section/course/${courseId}`);

      return dispatch({ type: actions.GET_SECTIONS_BY_COURSE_ID, payload: foundSections.data });
    } catch (error) {
      return dispatch({ type: actions.GET_SECTIONS_BY_COURSE_ID, payload: [] });
    }
  };
}

export function deleteSection(sectionId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/section/${sectionId}`);

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      return dispatch({ type: "DELETE_SECTION", payload: sectionId });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export const getCoursesByGenre = (genre) => async (dispatch) => {
  dispatch({ type: actions.GET_COURSES_LOADING })
  try {
    const res = await axios.get(`/courses/genre/${genre}`);  

    return dispatch({ type: 'GET_COURSES_BY_GENRE', payload: res.data.data});
  } catch (error) {
    dispatch({ type: 'GET_COURSES_BY_GENRE', payload: [] });
  }
};


export function resetPaginated(courseId) {
  return async (dispatch) =>  dispatch({ type: actions.RESET_PAGINATED });
}


export function getReviewsByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundReviews = await axios.get(`/review/${courseId}`);

      return dispatch({ type: actions.GET_REVIEWS_BY_COURSE_ID, payload: foundReviews.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_REVIEWS_BY_COURSE_ID, payload: [] });
    }
  };
}

export function getInstructorById(id) {
  return async function (dispatch) {
    try {
      const foundInstructor = await axios.get(`/instructor/${id}`);

      return dispatch({ type: actions.GET_INSTRUCTOR_BY_ID, payload: foundInstructor.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_INSTRUCTOR_BY_ID, payload: {} });
    }
  };
}

export function getUsersByCourseId(courseId) {
  return async function (dispatch) {
    try {
      const foundUsers = await axios.get(`/users/course/${courseId}`);

      return dispatch({ type: actions.GET_USERS_BY_COURSE_ID, payload: foundUsers.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_USERS_BY_COURSE_ID, payload: [] });
    }
  };
}

export function getVideoById(id) {
  return async function (dispatch) {
    try {
      const foundVideo = await axios.get(`/videos/${id}`);

      return dispatch({ type: actions.GET_VIDEO_BY_ID, payload: foundVideo.data.data });
    } catch (error) {
      return dispatch({ type: actions.GET_VIDEO_BY_ID, payload: {} });
    }
  };
}

export function postUser(payload) {
  return async function (dispatch) {
    const response = await axios.post("/users", payload);
    return response;
  };
};

export const getUserByCode = (code) => async (dispatch) => {
  
  try {
    const response = await axios.get(`/users?code=${code}`);
    const user = response.data.data[0];
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
      return user;
    } else {
      return null;
    }
  } catch (error) {
    dispatch(loginFail(error.message));
    return null
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

export function createCourse(payload, setActualForm) {
  return async function (dispatch) {
    try {
      const response = await axios.post("/courses", payload)
      
      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      setActualForm(constants.SELECT_INSTRUCTOR_FORM);

      return dispatch({ type: actions.CREATE_COURSE , payload: response.data.data })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  }
};

export function createSection(name, courseId) {
  return async function (dispatch) {
    try {
      const createdSection = await axios.post(`/section/${courseId}`,{name} )

      Swal.fire({
        icon: "success",
        title: createdSection.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      return dispatch({ type: actions.CREATE_SECTION, payload: createdSection.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  }
};

export function getSectionInCreatedSections (sectionId) {
  return async function (dispatch) {
    return dispatch({ type: actions.GET_SECTION_IN_CREATED_SECTIONS, payload: sectionId })
  }
};

export function createVideo(payload, sectionId) {
  return async (dispatch) => {
    try {
      const createdVideo = await axios.post(`/videos/${sectionId}`, payload);

      Swal.fire({
        icon: "success",
        title: createdVideo.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch({ type: actions.CREATE_VIDEO, payload: createdVideo.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function deleteVideo(videoId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`/videos/${videoId}`);

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      return dispatch({ type: "DELETE_VIDEO", payload: videoId });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function getVideosOfCreatedSection(sectionId) {
  return async (dispatch) => {
    dispatch({ type: actions.GET_VIDEOS_OF_CREATED_SECTION, payload: sectionId });
  };
}

export function createInstructor(payload, setActualForm) {
  return async (dispatch) => {
    try {
      const createdInstructor = await axios.post(`/instructor`, {
        name:            payload.name,
        description:     payload.description,
        profile_picture: payload.profile_picture,
        score:           payload.score,
        reviews:         payload.reviews,
        courseId:        payload.courseId
      });

      Swal.fire({
        icon: "success",
        title: createdInstructor.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      setActualForm(constants.SELECT_SECTION_FORM);

      dispatch({ type: actions.CREATE_INSTRUCTOR, payload: createdInstructor.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function updateInstructor(payload) {
  return async (dispatch) => {
    try {
      const updatedInstructor = await axios.put(`/instructor/${payload.id}`, {
        name:            payload.name,
        description:     payload.description,
        profile_picture: payload.profile_picture,
        score:           payload.score,
        reviews:         payload.reviews,
        courseId:        payload.courseId
      });

      Swal.fire({
        icon: "success",
        title: updatedInstructor.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch({ type: actions.UPDATE_INSTRUCTOR, payload: updatedInstructor.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function addInstructorToCourse(instructorId, courseId, setActualForm) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/instructor/add-course/${instructorId}`, {
        courseId: courseId 
      })

      Swal.fire({
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      setActualForm(constants.SELECT_SECTION_FORM);

      dispatch({ type: actions.ADD_INSTRUCTOR_TO_COURSE, payload: response.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function createReview(payload) {
  return async (dispatch) => {
    try {
      const createdReview = await axios.post("/review", payload);

      Swal.fire({
        icon: "success",
        title: createdReview.data.message,
        showConfirmButton: false,
        timer: 1500
      });

      dispatch({ type: actions.CREATE_REVIEW, payload: createdReview.data.data });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
}

export function getAllInstructors(payload) {
  return async (dispatch) => {
    try {
      const foundInstructors = await axios.get("/instructor")

      dispatch({ type: actions.GET_ALL_INSTRUCTORS, payload: foundInstructors.data.data });
    } catch (error) {
      dispatch({ type: actions.GET_ALL_INSTRUCTORS, payload: [] });
    }
  };
}

export function createVideoState (payload) {
  return async (dispatch) => {
    try {
      const createVideoState = await axios.post("/state", payload)
      dispatch({type: actions.POST_VIDEOS_STATE, payload: createVideoState.data.data })
    } catch (error) {
      return;
    }  
  }
}

export function getVideoState(userId, videoId) {
  return async (dispatch) => {
    try {
      const getVideoState = await axios.get(`/state/${userId}/${videoId}`)
      dispatch({type: actions.GET_VIDEOS_STATE, payload: getVideoState.data.data })
    } catch (error) {
      dispatch({type: actions.GET_VIDEOS_STATE, payload: {} })
    }
  }
};

export function getVideoStateCourse(userId, courseId) {
  return async (dispatch) => {
    try {
      const getStateCourse = await axios.get(`/state/${userId}/${courseId}`)
      dispatch({type: actions.GET_VIDEOS_STATE_COURSE, payload: getStateCourse.data.data })
    } catch (error) {
      return;
    }
  }
}


export function editCourse(id, data) {
  return async (dispatch) => {
    try {
      const editC = await axios.put(`/courses/${id}`, data);
      dispatch({ type: actions.EDIT_COURSE, payload: editC.data.data });
      Swal.fire({
        icon: "success",
        title: editC.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
  };
};

export function deleteCourse(id) {
   return async  (dispatch) => {
    try {
      const deleteCourse = await axios.delete(`/courses/${id}`)
      dispatch({ type: actions.DELETE_COURSE, payload: deleteCourse.data.data });
      Swal.fire({
        icon: "success",
        title: deleteCourse.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `El servidor ha respondido con el siguiente error: ${error.response.data.message}`,
        confirmButtonText: "Aceptar",
      });
    }
   }
}