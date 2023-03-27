const initialState = {
  courses: [],
  isLoggedIn: false,
  user: null,
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COURSES":
      return {
        ...state,
        courses: action.payload,
      };
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
    default:
      return state;
  }
}

export default rootReducer;
