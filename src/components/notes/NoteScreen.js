import React from "react";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
        />
        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
        ></textarea>
        <div className="notes__image">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4d0Yi8SwQOlbmnL0BJzjGbI5N8LU1Omdz2Q&usqp=CAU"
            alt="The Moon"
          />
        </div>
      </div>
    </div>
  );
};
