import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote } from "../../actions/notes";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.active);
  const handleSave = () => {
    if (!note.url) {
      delete note.url;
    }
    dispatch(startSaveNote(note));
    //console.log(note);
  };
  return (
    <div className="notes__appbar">
      <span>September 17th 2021</span>
      <div>
        <button className="btn">Picture</button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
