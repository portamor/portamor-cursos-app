import * as actions from "../constants/actionsContants";

const initialState = {
  allInstructors:   [],
  createdCourse:    {},
  courses:          [],
  courseDetail:     {},
  courseInstructor: {},
  courseSections:   [],
  courseUsers:      [],
  courseReviews:    [],
  videoDetail:      {},
  sectionVideos:    [],
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
      
    case actions.GET_SECTION_CREATE:
      return {
        ...state,
        courseSections: [...state.courseSections, action.payload],
      };

    case actions.GET_REVIEWS_BY_COURSE_ID:
      return {
        ...state,
        courseReviews: action.payload,
      };

    case actions.CREATE_COURSE:
      return {
        ...state,
        createdCourse: action.payload,
        courses:       [...state.courses, action.payload]
      };

    case actions.CREATE_VIDEO:
      return {
        ...state,
        sectionVideos: [...state.sectionVideos, action.payload]
      };

    case actions.CREATE_REVIEW:
      return {
        ...state,
        courseReviews: [...state.courseReviews, action.payload],
      };
    
    case actions.CREATE_INSTRUCTOR:
      return {
        ...state,
        courseInstructor: action.payload,
      };

    case actions.GET_ALL_INSTRUCTORS:
      return {
        ...state,
        allInstructors: action.payload,
      };
    
    default:
      return state;
  }
}

export default rootReducer;
