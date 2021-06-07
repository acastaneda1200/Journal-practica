import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { noteSelected } from '../../actions/notes';


export const JournalEntry = ({ id, date, title, body, url }) => {

    const diaSemana = moment(date).format("dddd");
    const diaMes = moment(date).format("Do");
    const dispatch = useDispatch()

    const handleEntryClick = () => {
        dispatch(noteSelected(id, {
            date,
            title,
            body,
            url
        }))
    }

    return (
        <div className="journal__entry pointer" onClick={handleEntryClick}>

            {
                url &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage:
                            `url(${url})`
                    }}
                ></div>}

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
