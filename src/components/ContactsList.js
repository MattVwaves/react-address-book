import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import DeleteContact from "./DeleteContact"

function ContactsList({isLoading, contacts, setContacts}) {
  
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
                <DeleteContact contact={contact} contacts={contacts} setContacts={setContacts}/>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
