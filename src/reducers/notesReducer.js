import { types } from "../types/types";



const initialState = {
    notes: [],
    noteSelected: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {


        case types.noteAdd:
            
            return {
                 ...state,
                 notes: [ action.payload, ...state.notes  ]
            }
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
                notes: action.payload

            }

        case types.notesUpdate:
            //recorre las notas del state y para actualizar en el sidebar la nota debemos encontrala primero
            // primero debemos evaluar la nota seleccionada y a actualziar entonces preguntamos 
            // note.id === action.payload.id
            //si esto se cumple 
            //traemos el nuevo payload osea la nueva nota
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id ?
                        { ...action.payload } :
                        note,
                )
            }

        case types.notesDelete:

            return {
                ...state,
                noteSelected: null,
                notes: state.notes.filter(note => note.id !== action.payload)
            }

        case types.notesLogout:
            return {

                notes: [],
                noteSelected: null
            }

        default:
            return state;
    }
}