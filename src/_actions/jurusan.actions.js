import { jurusanConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const {
  JURUSAN_REQUEST,
  JURUSAN_FAILURE,
  JURUSAN_GET,
  JURUSAN_POST
} = jurusanConstants;

const ref = firebase.firestore().collection("jurusan");

export const getJurusan = () => async dispatch => {
  dispatch({ type: JURUSAN_REQUEST });

  ref.get().then(snapshot => {
    let data = {};
    snapshot.forEach(async snap => {
      data[snap.id] = snap.data();
    });
    dispatch({ type: JURUSAN_GET, payload: data });
  });
};

export const postJurusan = (nama, fakultasId, fakultasNama) => {
  return async dispatch => {
    dispatch({ type: JURUSAN_REQUEST });

    ref
      .add({
        fakultas: {
          id: fakultasId,
          nama: fakultasNama
        },
        nama
      })
      .then(doc => {
        console.log("post berhasil", doc);
      });
  };
};

export const deleteJurusan = id => {
  return async dispatch => {
    dispatch({ type: JURUSAN_REQUEST });
    try {
      const del = await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
};

const jurusanFail = error => {
  return {
    type: JURUSAN_FAILURE,
    payload: error
  };
};
