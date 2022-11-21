import { Component, useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"
import ContactsEdit from "./components/ContactsEdit"
import Meetings from "./components/Meetings"

export default function App() {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    console.log(isLoading)
    fetch('http://localhost:4000/contacts')
    .then((res)=> res.json())
    .then((contactList)=> {
      setIsLoading(false)
      console.log(isLoading)
      setContacts(contactList)})
  },[])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
          <li><Link to="/">Contacts List</Link></li>
          
          <li><Link to="/add-new-contact">Add New Contact</Link></li>
        </ul>
      </nav>
      {isLoading === true ? <main>
        <h2>Contacts</h2>
        <div className="loader"></div></main> :
      <main>
        <Routes>
          <Route path="/" element={<ContactsList isLoading={isLoading} contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/add-new-contact" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/view-contact/:id" element={<ContactsView contacts={contacts}/>} />
          <Route path="/edit-contact/:id" element={<ContactsEdit contacts={contacts} setContacts={setContacts}/>} />
          <Route path="/contact/:id/meetings" element={<Meetings contacts={contacts} setContacts={setContacts}/>} />
        </Routes>

      </main>}
    </>
  )
}

