import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Meetings () {

const [meetings, setMeetings] = useState([])
const {id} = useParams()

useEffect (()=>{
    fetch(`http://localhost:4000/meetings?contactId=${id}`)
    .then((res)=> res.json())
    .then((meetings)=> setMeetings(meetings))
},[])

function handleSubmit (event) {
    console.log(meetings)
    event.preventDefault()
    console.log(event.target[0].value)

    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({

            date: event.target[0].value,
            time: event.target[1].value,
            location: event.target[2].value,
            contactId: id
          })
        }
        fetch (`http://localhost:4000/meetings?contactId=${id}`, opts)
        .then(res => res.json())
        .then(meeting => {
            const newMeetings = [...meetings, meeting]
            setMeetings(newMeetings)
        })
    }

    return (
    <>
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Add Meeting</h2>

      <label htmlFor="date">Date:</label>
      <input id="date" name="date" type="text" required/>

      <label htmlFor="time">Time:</label>
      <input id="time" name="time" type="text" required/>

      <label htmlFor="location">Location:</label>
      <input id="location" name="location" type="text" required/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
        <div>
            <h2>Meetings</h2>
            <ul>
                {meetings.map((meeting)=>{
                    return (
                        <>
                        <li key={meeting.id}>
                            <p>Date: {meeting.date}</p>
                            <p>Time: {meeting.time}</p>
                            <p>Location: {meeting.location}</p>
                            </li>
                            <br/>
                        </>
                    )
            })}
            </ul>
            </div>
            </>

    )
}