import { mahasiswaConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const {
  MAHASISWA_FAILURE,
  MAHASISWA_GET,
  MAHASISWA_POST,
  MAHASISWA_REQUEST
} = mahasiswaConstants;

const ref = firebase.firestore().collection("mahasiswa");

export const getMahasiswa = () => async dispatch => {
  dispatch({ type: MAHASISWA_REQUEST });

  let snapshot = await ref.get();

  let data = {};
  snapshot.forEach(snap => {
    data[snap.id] = snap.data();
  });

  dispatch({ type: MAHASISWA_GET, payload: data });
};

export const postMahasiswa = (nama, email, npm, jurusan) => {
  return async dispatch => {
    dispatch({ type: MAHASISWA_REQUEST });

    ref
      .add({
        nama,
        npm,
        email,
        jurusan
      })
      .then(doc => {
        console.log("post berhasil", doc);
      });
  };
};

export const deleteMahasiswa = id => {
  return async dispatch => {
    dispatch({ type: MAHASISWA_REQUEST });
    try {
      const del = await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
};
