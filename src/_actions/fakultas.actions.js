import { fakultasConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const { FAKULTAS_REQUEST, FAKULTAS_FAILURE, FAKULTAS_GET } = fakultasConstants;

const ref = firebase.firestore().collection("fakultas");

export const getFakultas = () => async dispatch => {
  dispatch({ type: FAKULTAS_REQUEST });
  ref.get().then(snapshot => {
    let data = {};
    snapshot.forEach(snap => {
      data[snap.id] = snap.data();
    });
    dispatch({ type: FAKULTAS_GET, payload: data });
  });
};
