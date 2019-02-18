import { jadwalmahasiswaConstants } from "../_constants";

const INITIAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const {
  JADWALMAHASISWA_FAILURE,
  JADWALMAHASISWA_GET,
  JADWALMAHASISWA_REQUEST
} = jadwalmahasiswaConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case JADWALMAHASISWA_REQUEST:
      return { ...state, loading: true, error: "" };
    case JADWALMAHASISWA_GET:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload,
        isSuccess: true
      };

    case JADWALMAHASISWA_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };

    default:
      return state;
  }
};
