import React from 'react';
import { Sidebar } from './Sidebar';
import { NoteScreen } from '../notes/NoteScreen';
import { useSelector } from 'react-redux';
import { NothingSelected } from './NothingSelected';
import { Spinner } from '../ui/Spinner';



export const JournalScreen = () => {

    const { noteSelected } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content">
            <Spinner />
            <Sidebar />
            <main>
                {
                    (noteSelected)
                        ? (<NoteScreen />)
                        : (<NothingSelected />)
                }

            </main>
        </div>
    )
}
