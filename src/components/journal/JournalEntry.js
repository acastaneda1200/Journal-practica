import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { noteSelected } from '../../actions/notes';


export const JournalEntry = ({ id, date, title, body }) => {

    const diaSemana = moment(date).format("dddd");
    const diaMes = moment(date).format("Do");
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(noteSelected(id, {
            date,
            title,
            body
        }))
    }

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>

            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{diaSemana}</span>
                <h4>{diaMes}</h4>
            </div>

        </div>
    )
}
