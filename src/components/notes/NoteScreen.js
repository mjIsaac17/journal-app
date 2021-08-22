import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    //Update the state when we change the text values of the note
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          value={title}
          type="text"
          name="title" //we need to add the name otherwise the text will not change. This is needed in useForm
          placeholder="Some awesome title"
          className="notes__title-input"
          onChange={handleInputChange}
        />
        <textarea
          value={body}
          name="body"
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
