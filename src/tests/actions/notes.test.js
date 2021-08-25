/**
 * @jest-environment node
 */
//This line was added after the issues with the test startLoadingNotes
//It should be in the beginning of the file

//npm i redux-mock-store --save-dev
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebaseConfig";
import { fileUpload } from "../../helpers/fileUpload";
import { types } from "../../types/types";
import * as fs from "fs";

// jest.mock("../../helpers/fileUpload", () => ({
//   fileUpload: jest.fn(() => {
//     // return "your-image.jpg";
//     return Promise.resolve("your-image.jpg");
//   }),
// }));

jest.mock("../../helpers/fileUpload", () => ({
  fileUpload: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const uid = "Test uid";
const initialState = {
  auth: { uid },
  notes: {
    active: {
      id: "3HjB7VQPCPArNYgkRiV5",
      title: "test1",
      body: "test2",
    },
  },
};
let store = mockStore(initialState);

describe("Tests with note actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("should create an new note, startNewNote", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions(); //it contains the actions [Notes] Set active note & [Notes] New note
    const payload = {
      id: expect.any(String),
      title: "",
      body: "",
      date: expect.any(Number),
    };
    expect(actions[0]).toEqual({ type: types.notesActive, payload });

    expect(actions[1]).toEqual({ type: types.notesAddNew, payload });
    //Delete data inserted in Firebase
    const recordId = actions[0].payload.id;
    await db.doc(`/Test uid/journal/notes/${recordId}`).delete();
  });

  test("startLoadingNotes should load the notes", async () => {
    await store.dispatch(startLoadingNotes("Test uid"));
    //In this point, the store contains the actions of the previous test, so we should use beforeEach to reinitialize it
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    const expectedObj = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expectedObj);
  });

  test("startSaveNote should update the note", async () => {
    const note = {
      id: "3HjB7VQPCPArNYgkRiV5", //existing id in Firebase
      title: "Test title",
      body: "Test body",
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    // console.log(actions);
    expect(actions[0].type).toBe(types.notesUpdate);

    //Validate the note updated
    const docRef = await db.doc(`/Test uid/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test("startUploading should update the entry (note) url", async () => {
    //const file = new File([], "picture.jpg");
    // await store.dispatch(startUploading(file));
    //This is added because new File is not recognized when using @jest-environment node
    fileUpload.mockReturnValue("https://hola-mundo.com");
    fs.writeFileSync("foto.jpg", "");
    const file = fs.readFileSync("foto.jpg");
    await store.dispatch(startUploading(file));
    fs.unlinkSync("foto.jpg"); //delete temporal file

    const docRef = await db
      .doc(`/${uid}/journal/notes/3HjB7VQPCPArNYgkRiV5`)
      .get();
    expect(docRef.data().url).toBe("https://hola-mundo.com");
  });
});
