import * as actions from "../constants/actionsContants";

const initialState = {
  allInstructors:         [],
  createdCourse:          {},
  createdSections:        [],
  createdVideos:          [],
  videosOfCreatedSection: [],
  courses:                [],
  pageSize:               9,
  courseDetail:           {},
  courseInstructor:       {},
  courseSections:         [],
  courseUsers:            [],
  courseReviews:          [],
  currentPage:            1,
  error:                  null,
  isLoggedIn:             false,
  error:                  null,
  user:                   [],
  user:                   null,
  sectionToAddVideo:      {},
  sectionVideos:          [],
  totalCourses:           0,
  totalPages:             1,
  videoDetail:            {},
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

    case actions.GET_COURSES:
      const {
        data,
        currentPage,
        pageSize,
        totalCourses,
        totalPages
      } = action.payload

      return {
        ...state,
        courses:      data,
        currentPage:  currentPage,
        pageSize:     pageSize,
        totalCourses: totalCourses,
        totalPages:   totalPages,
      };

    case actions.RESET_PAGINATED: 
      return {
        currentPage:  1,
        pageSize:     9,
        totalCourses: action.payload.length,
      }

    case 'GET_COURSES_BY_GENRE':
      return {
        ...state,
        courses:      action.payload,
        currentPage:  1,
        pageSize:     9,
        totalCourses: action.payload.length,
      };

    case actions.GET_COURSE_DETAIL:
      return {
        ...state,
        courseDetail: action.payload,
      };
    
    case actions.GET_COURSES_OF_USER: 
      return {
        ...state,
        courses: action.payload,
        currentPage:  1,
        pageSize:     9,
        totalCourses: action.payload.length,
      }
      
    case actions.GET_SECTIONS_BY_COURSE_ID:
      return {
        ...state,
        courseSections: action.payload,
      };
    
    case actions.GET_SECTION_IN_CREATED_SECTIONS:
      const sectionId = action.payload;

      const foundSection = state.createdSections.find((section) => section.id === sectionId)

      return {
        ...state,
        sectionToAddVideo: foundSection,
      };
        
    case actions.GET_VIDEOS_OF_CREATED_SECTION:
      const foundVideos = state.createdVideos.filter(video => video.SectionId === action.payload);
  
      return {
        ...state,
        videosOfCreatedSection: foundVideos,
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
    
    case actions.CREATE_SECTION:
      return {
        ...state,
        createdSections: [...state.createdSections, action.payload],
      };

    case actions.CREATE_VIDEO:
      return {
        ...state,
        createdVideos: [...state.createdVideos, action.payload]
      };

    case actions.CREATE_REVIEW:
      return {
        ...state,
        courseReviews: [...state.courseReviews, action.payload],
      };
    
    default:
      return state;
  }
}

export default rootReducer;
