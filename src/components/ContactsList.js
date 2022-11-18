import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom";



function ContactsList({contacts, setContacts}) {

  const navigate = useNavigate()

  const [contactToDelete, setContactToDelete] = useState(null)

  function handleClick  (contact){

    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      })
  }
  console.log(contactToDelete)
  fetch(`http://localhost:4000/contacts/${contact.id}`, opts)
      .then((res)=> res.json())
      .then((contactId)=> setContactToDelete(contactId))
      setContacts(contacts.filter((storedContact)=> storedContact !== contactToDelete))
      navigate("/")
}
  
  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <li className="contact" key={index}>
              <p>
                {firstName} {lastName}
              </p>
              <p>
                <Link to={`/view-contact/${contact.id}`} >
                View
                </Link>
              </p>
              <p></p>
              <p>
                <Link to={`/edit-contact/${contact.id}`} >
                Edit
                </Link>
              </p>
              <p></p>
              <p>
               <button onClick={()=> handleClick(contact)}>Delete</button>
              </p>
              
              
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
