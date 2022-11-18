import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsEdit from "./components/ContactsEdit"

export default function App() {
  const [contacts, setContacts] = useState([])
  
  //TODO: Load all contacts on useEffect when component first renders
  useEffect(()=>{
    fetch('http://localhost:4000/contacts')
    .then((res)=> res.json())
    .then((contactList)=> setContacts(contactList))
  },[contacts])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          
          {/* TODO: Make these links */}
          <li><Link to="/">Contacts List</Link></li>
          <li><Link to="/add-new-contact">Add New Contact</Link></li>
        </ul>
      </nav>
      <main>
      {/* <ContactsList contacts={contacts} /> */}
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/add-new-contact" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/view-contact/:id" element={<ContactsView contacts={contacts}/>} />
          <Route path="/edit-contact/:id" element={<ContactsEdit contacts={contacts} setContacts={setContacts}/>} />
        </Routes>
      </main>
    </>
  )
}
