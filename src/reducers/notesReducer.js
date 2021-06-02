import { types } from "../types/types";

const initialState = {
    notes: [],
    noteSelected: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.noteSelected:
            return {
                ...state,
                noteSelected: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            return {
               ...state,
               notes:  action.payload
               
            }

        default:
            return state;
    }
}