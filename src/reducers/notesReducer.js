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

    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
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

    case types.notesDelete:
      return {
        ...state,
        active: null, //clear active note
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesLogoutCleaning:
      return {
        notes: [],
        active: null,
      };
    default:
      return state;
  }
};
