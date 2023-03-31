import {GET_COURSE_DETAIL} from "./actions";

const initialState = {
  courses: [],
  courseDetail: {},
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
      console.log(action.payload)
      return {
        ...state,
        courseDetail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
