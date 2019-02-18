import { dosenConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const { DOSEN_FAILURE, DOSEN_GET, DOSEN_POST, DOSEN_REQUEST } = dosenConstants;

const ref = firebase.firestore().collection("dosen");

export const getDosen = () => async dispatch => {
  dispatch({ type: DOSEN_REQUEST });

  let snapshot = await ref.get();

  let data = {};
  snapshot.forEach(snap => {
    data[snap.id] = snap.data();
  });

  dispatch({ type: DOSEN_GET, payload: data });
};

export const postDosen = (nama, email, nid, password) => {
  return async dispatch => {
    dispatch({ type: DOSEN_REQUEST });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log("user berhasil di buat : ", data);
      })
      .catch(e => {
        console.log("gagal buat user", e);
      });

    ref
      .add({
        nama,
        nid,
        email
      })
      .then(doc => {
        console.log("post berhasil", doc);
      });
  };
};

export const deleteDosen = id => {
  return async dispatch => {
    dispatch({ type: DOSEN_REQUEST });
    try {
      const del = await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
};
