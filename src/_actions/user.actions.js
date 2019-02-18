import { userConstants } from "../_constants";
import firebase from "../_constants/config.firebase";

const { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } = userConstants;

export const login = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(signedInUser => {
      console.log("loggedin", signedInUser);
    })
    .catch(err => {
      console.error(err);
      let error = { pesan: err.message };
      dispatch(loginFail(error));
    });
};

export const setUser = user => dispatch => {
  console.log("usr", user.email);
  firebase
    .firestore()
    .collection("isAdmin")
    .where("email", "==", user.email)
    .get()
    .then(snapshot => {
      if (snapshot.size > 0) {
        dispatch(loginSucess(user));
      } else {
        dispatch(logout());
      }
    });
};

const loginSucess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

const loginFail = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

const isAdmin = async user => {
  firebase.collection("isAdmin").then(data => {
    console.log("datanya", data);
  });
};

export const logout = () => {
  return async dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signout"));
    dispatch({ type: LOGOUT });
  };
};
