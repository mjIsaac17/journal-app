import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let store = mockStore({});

describe("Test with Auth actions", () => {
  const uid = "123456";
  const displayName = "Isaac";

  beforeEach(() => {
    store = mockStore({});
  });

  test("login should call its respective action (types.login) and return the expected data", () => {
    const loginAction = login(uid, displayName);

    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName },
    });
  });

  test("logout should call its respective action (types.logout)", () => {
    const logoutAction = logout();
    expect(logoutAction).toEqual({ type: types.logout });
  });

  test("should do the logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: types.logout });
    expect(actions[1]).toEqual({ type: types.notesLogoutCleaning });
  });

  test("should begin the startLoginWithEmailAndPassword", async () => {
    await store.dispatch(startLoginEmailPassword("test@gmail.com", "123456"));
    const actions = store.getActions();
    console.log(actions);

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: "C0Np0F20ayOuj2u6XHQas4AtIbV2",
        displayName: null,
      },
    });
  });
});
