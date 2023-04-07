import * as actions from "../constants/actionsContants";

const initialState = {
  courses: [],
  courseDetail: {},
  courseInstructor: {},
  courseSections: [],
  courseUsers: [],
  courseReviews: [],
  videoDetail: {},
  user: [],
  courseCreate: [],
  sectionCreate: [],
  isLoggedIn: false,
  user: null,
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };

    case "GET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };

    case actions.GET_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: action.payload,
      };
      
    case actions.GET_SECTIONS_BY_COURSE_ID:
      return {
        ...state,
        courseSections: action.payload,
      };

      case 'GET_COURSES_BY_GENRE':
        return {
          ...state,
          courses: action.payload
        };
      
    case actions.GET_USERS_BY_COURSE_ID:
      return {
        ...state,
        courseUsers: action.payload,
      };

    case actions.GET_INSTRUCTOR_BY_ID:
      return {
        ...state,
        courseInstructor: action.payload,
      };
    
    case actions.GET_VIDEO_BY_ID:
      return {
        ...state,
        videoDetail: action.payload,
      };
      case actions.GET_COURSE_CREATE:
        return {
          ...state,
          courseCreate: action.payload,
        };
        case actions.GET_SECTION_CREATE:
          return {
            ...state,
            sectionCreate: action.payload,
          };

    case actions.GET_REVIEWS_BY_COURSE_ID:
      return {
        ...state,
        courseReviews: action.payload,
      };

    case actions.CREATE_REVIEW:
      console.log("reducer", action.payload)
      
      return {
        ...state,
        courseReviews: [...state.courseReviews, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
