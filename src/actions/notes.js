import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import Swal from 'sweetalert2'

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
        dispatch(startLoadNotes(uid))
    }
}

export const updateNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { noteSelected } = getState().notes
        const notesRef = await db.collection(`${uid}/journal/notes`)
        notesRef
            .doc(noteSelected.id)
            .update({
                ...note
            })

        try {
            dispatch(updateNotes(noteSelected.id, note))
            Swal.fire(
                'Note Updated',
                noteSelected.title,
                'success'
            )
        } catch (error) {
            Swal.fire(
                'Sorry',
                error,
                'error'
            )
        }

    }
}

export const noteSelected = (id, note) => ({
    type: types.noteSelected,
    payload: {
        id,
        ...note
    }
})

export const updateNotes = (id, note) => ({
    type: types.notesUpdate,
    payload: {
        id,
        ...note
    }
})

export const loadNotes = async (uid) => {

    const getNotes = await db.collection(`${uid}/journal/notes`).get()
    const notes = [];
    getNotes.forEach((note) => {
        notes.push({
            id: note.id,
            ...note.data()
        });
    })

    return notes;
}

export const startLoadNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))

    }
}


export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { noteSelected } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowsOutSideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await uploadFile(file);
        noteSelected.url = fileUrl;
        dispatch(updateNote(noteSelected));
        Swal.close();
    }
}

export const uploadFile = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dya0zxqg4/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal')
    formData.append('file', file)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json(); 
        }
    } catch (error) {
        throw error
    }
}