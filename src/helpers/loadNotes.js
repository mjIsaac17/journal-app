import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const notesSnap = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];
  //   console.log(notesSnap);
  notesSnap.forEach((note) => {
    notes.push({
      id: note.id,
      ...note.data(),
    });
  });

  return notes;
};
