import { fakultasConstants } from "../_constants";

const INITIAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const { FAKULTAS_FAILURE, FAKULTAS_GET, FAKULTAS_REQUEST } = fakultasConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FAKULTAS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FAKULTAS_GET:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload,
        isSuccess: true
      };
    case FAKULTAS_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };
    default:
      return state;
  }
};
