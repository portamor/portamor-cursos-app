import {
  GET_COURSE_DETAIL,
  GET_INSTRUCTOR_BY_ID, 
  GET_REVIEWS_BY_COURSE_ID, 
  GET_SECTIONS_BY_COURSE_ID, 
  GET_USERS_BY_COURSE_ID
} from "../constants";

const initialState = {
  courses: [],
  courseDetail: {},
  courseInstructor: {},
  courseSections: [],
  courseUsers: [],
  courseReviews: [],
  user: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };

    case GET_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: action.payload,
      };
      
    case GET_SECTIONS_BY_COURSE_ID:
      return {
        ...state,
        courseSections: action.payload,
      };
      
    case GET_REVIEWS_BY_COURSE_ID:
      return {
        ...state,
        courseReviews: action.payload,
      };
      
    case GET_USERS_BY_COURSE_ID:
      return {
        ...state,
        courseUsers: action.payload,
      };

    case GET_INSTRUCTOR_BY_ID:
      return {
        ...state,
        courseInstructor: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
