import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  //this dispatch is offered by thunk
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        dispatch(finishLoading());
        Swal.fire("Error", err.message, "error");
        // console.log(err);
      });
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        //We use async-await to avoid adding another then
        //Update the user name from null to "name".
        await user.updateProfile({ displayName: name });
        // console.log(user);
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
        // console.log(err);
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  };
};

export const login = (uid, displayName) => ({
  //implicit return
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(noteLogout());
  };
};

export const logout = () => ({
  type: types.logout,
});
