import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

function ContactsEdit(props) {

  const [contactToEdit, setContactToEdit] = useState(false)
  const { setContacts, contacts } = props
  const navigate = useNavigate()

  const {id} = useParams()

  const [contactType, setContactType] = useState(null)

  useEffect(()=>{
    fetch(`http://localhost:4000/contacts/${id}`)
    .then((res)=> res.json())
    .then((contactId)=> setContactToEdit(contactId))
  },[id])

console.log(contactToEdit)

let editedContact = {}
let updatedContacts = []

  function handleChange (event){
  setContactType(event.target.value)
}
  function handleSubmit (event){
    event.preventDefault()

    if (event.target[0].value !==''){
        editedContact.firstName = event.target[0].value
    }
    if (event.target[1].value !==''){
        editedContact.lastName = event.target[1].value
    }
    if (event.target[2].value !==''){
        editedContact.street = event.target[2].value
    }
    if (event.target[3].value !==''){
        editedContact.city = event.target[3].value
    }
    if (event.target[4].value !==''){
        editedContact.email = event.target[4].value
    }
    if (event.target[5].value !==''){
        editedContact.linkdIn = event.target[5].value
    }
    if (event.target[6].value !==''){
        editedContact.twitter = event.target[6].value
    }
    console.log(contactToEdit)

    const opts = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        firstName: editedContact.firstName,
        lastName: editedContact.lastName,
        street: editedContact.street,
        city: editedContact.city,
        email: editedContact.email,
        linkdin: editedContact.linkdInd,
        twitter: editedContact.twitter,
        contactType: contactType
      })
    }
    fetch(`http://localhost:4000/contacts/${id}`, opts)
      .then(res => res.json())
      .then(editedContact => {
        updatedContacts = contacts.map((storedContact)=>{
            if (storedContact.id === contactToEdit.id){
                return editedContact
            } else {
                return storedContact
            }
        })
        console.log(updatedContacts)
        setContacts(updatedContacts)

        navigate("/")
      })
      event.target[0].value = ""
      event.target[1].value = ""
      event.target[2].value = ""
      event.target[3].value = ""
      event.target[4].value = ""
      event.target[5].value = ""
      event.target[6].value = ""
  }
  
  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">FirstName</label>
      <input id="firstName" name="firstName" type="text" placeholder={contactToEdit.firstName}  />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" placeholder={contactToEdit.lastName} />

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" placeholder={contactToEdit.street} />

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" placeholder={contactToEdit.city} />

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" placeholder={contactToEdit.email} />

      <label htmlFor="linkdin">Linkdin:</label>
      <input id="linkdin" name="linkdin" type="link" placeholder={contactToEdit.linkdIn} />

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="link" placeholder={contactToEdit.twitter} />

      <h2>Contact Type</h2>

      <label htmlFor="contact-type">Work:</label>
      <input id="work" type="radio" name="contact-type" value="work" onChange={handleChange}/>

      <label htmlFor="contact-type">Personal:</label>
      <input id="personal" type="radio" name="contact-type" value="personal" onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Save
        </button>
      </div>
    </form>
  )
}

export default ContactsEdit
