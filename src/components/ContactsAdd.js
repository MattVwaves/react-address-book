import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";


function ContactsAdd(props) {

  const navigate = useNavigate()

  const { setContacts, contacts } = props

  const [contactType, setContactType] = useState(null)

  function handleChange (event){
    setContactType(event.target.value)
  }

  useEffect (()=>{
    console.log(contactType)
  })

  function handleSubmit (event){
    event.preventDefault()
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: event.target[0].value,
        lastName: event.target[1].value,
        street: event.target[2].value,
        city: event.target[3].value,
        email: event.target[4].value,
        linkdin: event.target[5].value,
        twitter: event.target[6].value,
        contactType: contactType
      })
    }
    fetch(`http://localhost:4000/contacts`, opts)
      .then(res => res.json())
      .then(data => {
        const newContact = {...data}
        const newContacts = [...contacts, newContact]
        setContacts(newContacts)
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
      <h2>Create Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input id="firstName" name="firstName" type="text" required />

      <label htmlFor="lastName">Last Name:</label>
      <input id="lastName" name="lastName" type="text" required/>

      <label htmlFor="street">Street:</label>
      <input id="street" name="street" type="text" required/>

      <label htmlFor="city">City:</label>
      <input id="city" name="city" type="text" required/>

      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required/>

      <label htmlFor="linkdin">Linkdin:</label>
      <input id="linkdin" name="linkdin" type="link" required/>

      <label htmlFor="twitter">Twitter:</label>
      <input id="twitter" name="twitter" type="link" required/>

      <h2>Contact Type</h2>

      <label htmlFor="contact-type">Work:</label>
      <input id="work" type="radio" name="contact-type" value="work" onChange={handleChange}/>

      <label htmlFor="contact-type">Personal:</label>
      <input id="personal" type="radio" name="contact-type" value="personal" onChange={handleChange}/>

      <div className="actions-section">
        <button className="button blue" type="submit">
          Create
        </button>
      </div>
    </form>
  )
}

export default ContactsAdd
