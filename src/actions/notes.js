import { db } from "../firebase/firebaseConfig";
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
    //Order to store data in Firestore: collection/document/collection/document ...
    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    // console.log(doc);
    dispatch(activeNote(doc.id, newNote));
  };
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
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
