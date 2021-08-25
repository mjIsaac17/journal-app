import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("Tests in authReducer", () => {
  const initialState = { uid: "sadasdas132g4ffr", name: "Isaac" };

  test("should not change the state", () => {
    const state = authReducer(initialState, []);
    expect(state).toEqual(initialState);
  });

  test("should return the authenticated user data when logging in", () => {
    const action = {
      type: types.login,
      payload: { uid: "123456", displayName: "Isaac" },
    };
    const state = authReducer({}, action);
    const expectedState = { uid: "123456", name: "Isaac" };
    expect(state).toEqual(expectedState);
  });

  test("should return an empty object when logging out", () => {
    const action = { type: types.logout };
    const state = authReducer(initialState, action);
    expect(state).toEqual({});
  });
});
