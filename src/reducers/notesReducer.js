import { types } from "../types/types";

/**
 * state =
 * {
 *  notes: [],
 *  action: null or
 *  active: {
 *      id: 'asdsadfefewf',
 *      title: '',
 *      body: '',
 *      imageUrl: '',
 *      date: 132456789
 *  }
 * }
 */
const initialState = {
  notes: [],
  active: null,
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    default:
      return state;
  }
};
