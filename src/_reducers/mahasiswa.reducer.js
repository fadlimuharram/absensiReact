import { mahasiswaConstants } from "../_constants";

const INITIAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const {
  MAHASISWA_FAILURE,
  MAHASISWA_GET,
  MAHASISWA_REQUEST
} = mahasiswaConstants;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MAHASISWA_REQUEST:
      return { ...state, loading: true, error: "" };
    case MAHASISWA_GET:
      return {
        ...state,
        ...INITIAL_STATE,
        data: action.payload,
        isSuccess: true
      };

    case MAHASISWA_FAILURE:
      return { ...state, ...INITIAL_STATE, error: action.payload };

    default:
      return state;
  }
};
