import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth';
import { addNewNote } from '../../actions/notes';


export const Sidebar = () => {

    const {name} = useSelector(state => state.auth)
    const {notes} = useSelector(state => state.notes)

    // useEffect(() => {
        
        
    // }, [notes])

    const dispatch = useDispatch();

    const hanleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNewNote = () => {
       
       dispatch(addNewNote())
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> {name}</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ hanleLogout }
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry" onClick={handleAddNewNote}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />    

        </aside>
    )
}
