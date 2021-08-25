import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};

const store = mockStore(initialState);
// store.dispatch = jest.fn(); //this is for async functions

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);
describe("Tests in <RegisterScreen/>", () => {
  test("should load the component correcly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("email should not be valid", () => {
    const emailField = wrapper.find('input[name="email"]');
    act(() => {
      //added to remove an error, "code that causes React state updates should be wrapped in act"
      emailField.prop("onChange")({
        target: { value: "your-email", name: "email" },
      });
    });

    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Invalid email",
    });
  });

  test("should show the alert box with when there is an error", () => {
    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Email is not valid",
      },
    };

    const store = mockStore(initialState);
    // store.dispatch = jest.fn(); //this is for async functions

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
    expect(wrapper.find(".auth__alert-error").text().trim()).toEqual(
      initialState.ui.msgError
    );
  });
});
