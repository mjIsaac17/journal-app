import { mount } from "enzyme";
import { Sidebar } from "../../components/journal/Sidebar";

import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";

jest.mock("../../actions/auth", () => ({
  startLogout: jest.fn(),
}));

jest.mock("../../actions/notes", () => ({
  startNewNote: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: { uid: "abc", name: "Isaac" },
  notes: { notes: [] },
};

let store = mockStore(initialState);
store.dispatch = jest.fn(); //for async functions

describe("Tests in <Sidebar />", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
  test("should show the component properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call the startLogout", () => {
    wrapper.find("button").prop("onClick")();
    expect(startLogout).toHaveBeenCalled();
  });

  test("should call the startNewNote", () => {
    wrapper.find(".journal__new-entry").prop("onClick")();
    expect(startNewNote).toHaveBeenCalled();
  });
});
