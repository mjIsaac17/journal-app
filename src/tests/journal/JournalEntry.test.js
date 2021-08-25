import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { JournalEntry } from "../../components/journal/JournalEntry";
import { activeNote } from "../../actions/notes";

// jest.mock("../../actions/notes", () => ({
//   activeNote: jest.fn(),
// }));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

let store = mockStore({});
store.dispatch = jest.fn();
describe("Tests in <JournalEntry />", () => {
  const note = {
    id: "123",
    title: "This is a title",
    body: "React course",
    date: 123,
    url: "image.jpg",
  };
  const wrapper = mount(
    <Provider store={store}>
      <JournalEntry {...note} />
    </Provider>
  );
  test("should load the component properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  // 1. Option to test activeNote, it is needed to use the mock
  //   test("should trigger activeNote with the selected note", () => {
  //     wrapper.find(".journal__entry").prop("onClick")();
  //     expect(activeNote).toHaveBeenCalledWith(note.id, note);
  //   });

  // 2. Other alternative to the activeNote with the store
  test("should active the note", () => {
    wrapper.find(".journal__entry").prop("onClick")();
    //store.dispatch contains the arguments with which the function was called
    expect(store.dispatch).toHaveBeenCalledWith(activeNote("1", note));
  });
});
