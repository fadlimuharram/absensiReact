import { jadwalmahasiswaConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const {
  JADWALMAHASISWA_REQUEST,
  JADWALMAHASISWA_FAILURE,
  JADWALMAHASISWA_GET,
  JADWALMAHASISWA_POST
} = jadwalmahasiswaConstants;

const ref = firebase.firestore().collection("jadwal_mahasiswa");

export const getJadwalMahasiswa = () => async dispatch => {
  dispatch({ type: JADWALMAHASISWA_REQUEST });

  ref.get().then(snapshot => {
    let data = {};
    snapshot.forEach(async snap => {
      data[snap.id] = snap.data();
    });
    dispatch({ type: JADWALMAHASISWA_GET, payload: data });
  });
};

export const postJadwalMahasiswa = (mahasiswa, matapelajaran) => {
  return async dispatch => {
    dispatch({ type: JADWALMAHASISWA_REQUEST });

    ref
      .add({
        mahasiswa,
        matapelajaran
      })
      .then(doc => {
        console.log("post berhasil", doc);
      });
  };
};

export const deleteJadwalMahasiswa = id => {
  return async dispatch => {
    dispatch({ type: JADWALMAHASISWA_REQUEST });
    try {
      const del = await ref.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };
};

const jurusanFail = error => {
  return {
    type: JADWALMAHASISWA_FAILURE,
    payload: error
  };
};
