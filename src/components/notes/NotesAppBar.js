import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

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

  const handlePictureClick = () => {
    document.querySelector("#iInputFile").click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <span>September 17th 2021</span>
      <input
        id="iInputFile"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
