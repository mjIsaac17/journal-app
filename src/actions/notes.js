import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    //Video 260. getState returns all the state (auth, ui, notes)
    // const state = getState();
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    try {
      //Order to store data in Firestore: collection/document/collection/document ...
      const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
      // console.log(doc);
      dispatch(activeNote(doc.id, newNote));
      dispatch(addNewNoteInStore(doc.id, newNote));
    } catch (error) {
      console.log(error);
    }
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNoteInStore = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startSaveNote = (note) => {
  //Because this is a sync task we use thunk to have access to the dispatch and getState
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;
    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFireStore);
    dispatch(refreshNote(note.id, noteToFireStore));
    Swal.fire("Saved", note.title, "success");
  };
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdate,
  payload: { id, note: { id, ...note } },
});

//If the task is async, the function name will begin with 'start'
export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;
    Swal.fire({
      title: "Uploading",
      text: "Please wait...",
      allowOutsideClick: false,
      // onBeforeOpen: () => {
      //   Swal.showLoading();
      // },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNote(activeNote));
    Swal.close();
  };
};
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    //Delete note in Firebase
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNoteInStore(id));
  };
};

export const deleteNoteInStore = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
