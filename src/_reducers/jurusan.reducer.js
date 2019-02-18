import { jurusanConstants } from "../_constants";

const INITAL_STATE = {
  data: {},
  error: "",
  loading: false,
  isSuccess: false
};

const { JURUSAN_REQUEST, JURUSAN_FAILURE, JURUSAN_GET } = jurusanConstants;

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case JURUSAN_REQUEST:
      return { ...state, loading: true, error: "" };
    case JURUSAN_GET:
      return {
        ...state,
        ...INITAL_STATE,
        data: action.payload,
        isSuccess: true
      };

    case JURUSAN_FAILURE:
      return { ...state, ...INITAL_STATE, error: action.payload };

    default:
      return state;
  }
};
