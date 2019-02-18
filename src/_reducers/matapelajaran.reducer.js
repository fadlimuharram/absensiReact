import { matapelajaranConstants } from "../_constants";

const INITIAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const {
  MATAPELAJARAN_FAILURE,
  MATAPELAJARAN_GET,
  MATAPELAJARAN_REQUEST
} = matapelajaranConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MATAPELAJARAN_REQUEST:
      return { ...state, loading: true, error: "" };
    case MATAPELAJARAN_GET:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload,
        isSuccess: true
      };

    case MATAPELAJARAN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };

    default:
      return state;
  }
};
