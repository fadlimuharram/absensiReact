import { userConstants } from "../_constants";

const INITIAL_STATE = {
  user: {},
  error: "",
  loading: false,
  isSuccess: false
};

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = userConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: "" };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        isSuccess: true
      };
    case LOGIN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };

    default:
      return state;
  }
};
