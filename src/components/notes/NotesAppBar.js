import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUploading, updateNote } from '../../actions/notes'

export const NotesAppBar = () => {

    const { noteSelected } = useSelector(state => state.notes)
  
    const  dispatch = useDispatch()
    const handleSave = () => {
        dispatch(updateNote(noteSelected))
    }

    const handlePictureClick = () => {
        document.querySelector('#filePicture').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
      
        if (file){
            dispatch(startUploading(file))
        }
    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <input id="filePicture" type="file" style={{display: 'none'}}  onChange={handleFileChange} />
            <div>
                <button className="btn" onClick={handlePictureClick}>
                    Picture
                </button>

                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
