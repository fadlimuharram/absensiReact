import { dosenConstants } from "../_constants";

const INITIAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const { DOSEN_FAILURE, DOSEN_GET, DOSEN_REQUEST } = dosenConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DOSEN_REQUEST:
      return { ...state, loading: true, error: "" };
    case DOSEN_GET:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload,
        isSuccess: true
      };

    case DOSEN_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };

    default:
      return state;
  }
};
