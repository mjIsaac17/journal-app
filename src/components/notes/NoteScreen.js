import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          value={title}
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          onChange={handleInputChange}
        />
        <textarea
          value={body}
          placeholder="What happened today?"
          className="notes__textarea"
          onChange={handleInputChange}
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
