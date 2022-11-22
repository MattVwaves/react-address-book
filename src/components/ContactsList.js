import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import DeleteContact from "./DeleteContact"


function ContactsList({ contacts, setContacts}) {

  let [searchParams, setSearchParams] = useSearchParams();

  const [work, setWork] = useState(null)
  const [personal, setPersonal] = useState(null)
  const [all, setAll] = useState(null)

  let filteredContacts = contacts

  const handleChange = ((event)=> {
    setContacts(contacts)
    if (event.target.value === "work"){
       filteredContacts = contacts.filter((contact)=> contact.contactType === "work")
       setPersonal(null)
       setAll(null)
      setWork(filteredContacts)
    } 
    if (event.target.value === "personal"){
       filteredContacts = contacts.filter((contact)=> contact.contactType === "personal")
       setWork(null)
       setAll(null)
      setPersonal(filteredContacts)
    } 
    if (event.target.value === "all"){
     setAll(contacts)
   } 
  })

  if (work !== null) filteredContacts = work
  if (personal !== null) filteredContacts = personal
  if (all !== null) filteredContacts = all

  return (
    <>
      <header>
        <h2>Contacts</h2>
        <select onChange={handleChange} name="type" id="type">
          <option value="all" >all</option>
          <option value="work" >work</option>
          <option value="personal" >personal</option>
  </select>
      </header>
      <ul className="contacts-list">
        { filteredContacts.map((contact, index) => {
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
