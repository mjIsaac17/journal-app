import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../actions/auth";
import { firebase } from "../../firebase/firebaseConfig";
import { AppRouter } from "../../routers/AppRouter";

jest.mock("../../actions/auth", () => ({
  login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "123456",
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn(); //for async functions

describe("Tests in <AppRouter />", () => {
  test("should call the login if an user is authenticated", async () => {
    await act(async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
      await firebase
        .auth()
        .signInWithEmailAndPassword("test@gmail.com", "123456");
    });
    expect(login).toHaveBeenCalledWith("C0Np0F20ayOuj2u6XHQas4AtIbV2", null);
  });
});
