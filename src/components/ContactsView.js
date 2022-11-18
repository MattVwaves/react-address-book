import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ContactsView() {
  const [contact, setContact] = useState(false)

  //TODO: Get the contact to load from the params and fetch.
  //With useEffect, load the contact when params changes
  //and update contact state
  const {id} = useParams()

  useEffect(()=>{
    fetch(`http://localhost:4000/contacts/${id}`)
    .then((res)=> res.json())
    .then((contactId)=> setContact(contactId))

  },[id])

  if (!contact) {
    return <p>Loading</p>
  }

  return (
    <div>
      <h2>{contact.firstName} {contact.lastName}</h2>
      <p>{contact.street} {contact.city}</p>
      <p>{contact.email}</p>
      <p><a href={contact.linkdin}>{contact.linkdin}</a></p>
      <p><a href={contact.twitter}>{contact.twitter}</a></p>
    </div>
  )
}

export default ContactsView