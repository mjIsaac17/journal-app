import { mount } from "enzyme";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { activeNote } from "../../actions/notes";
import { NoteScreen } from "../../components/notes/NoteScreen";

jest.mock("../../actions/notes", () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  notes: {
    active: {
      id: "123456",
      title: "",
      body: "",
    },
  },
};

let store = mockStore(initialState);
store.dispatch = jest.fn(); //for async functions

describe("Tests in <NoteScreen/>", () => {
  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );
  test("should load correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should trigger the active note", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: { name: "title", value: "Changing the value..." },
    });
    expect(activeNote).toHaveBeenCalledWith("123456", {
      title: "Changing the value...",
      body: "",
      id: "123456",
    });
  });
});
