import { db } from "../firebase/firebase-config";
import { types } from '../types/types';

export const addNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
        dispatch(noteSelected(doc.id, newNote))
    }
}

export const noteSelected = (id, note) => ({
    type: types.noteSelected,
    payload: {
        id,
        ...note
    }
})

export const loadNotes = async  (uid) => {

    const getNotes = await db.collection(`${uid}/journal/notes`).get()
    const notes = [];
    getNotes.forEach( (note) => {
       notes.push({
           id: note.id,
           ...note.data()
       });
    })
    
   return notes;
}

export const startLoadNotes = (uid) => {
    return async (dispatch) => {
        const notes =  await loadNotes(uid);
        dispatch(setNotes(notes))

    }
}


export const setNotes = (notes) =>  ({
    type: types.notesLoad,
    payload: notes
})