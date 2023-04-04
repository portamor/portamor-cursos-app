import * as actions from "../constants";

const initialState = {
  courses: [],
  courseDetail: {},
  courseInstructor: {},
  courseSections: [],
  courseUsers: [],
  courseReviews: [],
  videoDetail: {},
  user: [],
  courseCreate: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
      
    case actions.GET_REVIEWS_BY_COURSE_ID:
      return {
        ...state,
        courseReviews: action.payload,
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

    default:
      return state;
  }
}

export default rootReducer;
