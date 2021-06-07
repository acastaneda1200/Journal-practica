import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'
import { noteSelected } from '../../actions/notes'

export const NoteScreen = () => {
    const dispatch = useDispatch()
    const {noteSelected:note} = useSelector(state => state.notes)
    const [formValues, handleInputChange, reset] = useForm(note)
    
    //Obtengo el id de la nota seleccionada
    const selectedId = useRef( note.id)
    
    
    const {id, title, body} = formValues;
  
    
    useEffect(() => {
        //entonces cuando cambie la nota (id distinto) se activa el effecto con el reset y la nueva nota
        if (selectedId.current !== note.id){
            reset(note)
            selectedId.current = note.id
        }
    }, [note, reset])

   
    useEffect(() => {
       dispatch(noteSelected(id, formValues))
    }, [formValues, dispatch, id])
    
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

              {
                  note.url &&
                <div className="notes__image">
                    <img 
                        src={note.url}
                        alt="imagen"
                    />
                </div>}


            </div>

        </div>
    )
}
