import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useSearchParams } from "react-router-dom"


function ContactsView() {

  const [contact, setContact] = useState(false)

  const {id} = useParams()

  useEffect(()=>{
    fetch(`http://localhost:4000/contacts/${id}`)
    .then((res)=> res.json())
    .then((contactId)=> setContact(contactId))

  },[id])

  if (!contact) {
    return (
    <p>loading</p>

    )
  }
  const workStyle = {
      color: "greenYellow",
      backgroundColor: "black",
      width: "fit-content",
      border: "2px solid pink",
      padding: "3px"
  }
  const personalStyle = {
      color: "violet",
      backgroundColor: "black",
      width: "fit-content",
      border: "2px solid pink",
      padding: "3px"
  }

  return (
    <>
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street},  {contact.city}</p>
      <p>{contact.email}</p>
      <p><a href={contact.linkdin}>{contact.linkdin}</a></p>
      <p><a href={contact.twitter}>{contact.twitter}</a></p>
      {contact.contactType === "work" ?
      <p style={workStyle}>{contact.contactType}</p> :
      <p style={personalStyle}>{contact.contactType}</p> }
    </div>
    <div>
      <br/>
    <p><Link to={`/contact/${id}/meetings`}>Meetings</Link></p>
    </div>
    </>
  )
}

export default ContactsView