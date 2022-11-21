import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";

function DeleteContact ({contact, contacts, setContacts}){

    const navigate = useNavigate()

    const [contactToDelete, setContactToDelete] = useState(null)

    function handleClick  (contact){
  
      console.log(10)
      console.log(contact)
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        })
    }
    
    fetch(`http://localhost:4000/contacts/${contact.id}`, opts)
        .then((res)=> res.json())
        .then((contactId)=> setContactToDelete(contactId))
        setContacts(contacts.filter((storedContact)=> storedContact !== contact))
        console.log(contacts)
        navigate("/")
  }

    return (
        <button onClick={()=> handleClick(contact)}>Delete</button>
    )

}
export default DeleteContact