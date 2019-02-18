import { matapelajaranConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const {
  MATAPELAJARAN_FAILURE,
  MATAPELAJARAN_GET,
  MATAPELAJARAN_POST,
  MATAPELAJARAN_REQUEST
} = matapelajaranConstants;

const ref = firebase.firestore().collection("matapelajaran");

export const getMataPelajaran = () => async dispatch => {
  dispatch({ type: MATAPELAJARAN_REQUEST });

  let snapshot = await ref.get();

  let data = {};
  snapshot.forEach(snap => {
    data[snap.id] = snap.data();
  });

  dispatch({ type: MATAPELAJARAN_GET, payload: data });
};

export const postMataPelajaran = (nama, hari, jam, sks, dosen, kelas) => {
  return async dispatch => {
    dispatch({ type: MATAPELAJARAN_REQUEST });

    ref
      .add({
        nama,
        hari,
        jam,
        sks,
        dosen,
        kelas
      })
      .then(doc => {
        console.log("post berhasil", doc);
      });
  };
};

export const deleteMataPelajaran = id => {
  return async dispatch => {
    dispatch({ type: MATAPELAJARAN_REQUEST });
    try {
      const del = await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
};
