import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

   if (!personSame()) {
    setPersons(persons.concat(personObject))
    setNewName('')
      }
    }
  

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const personSame = () => {
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return true;
    } else {
      return false;
    }
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} 
                onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) =>
          <li key={person.name}>
            {person.name}
          </li>
          )}
      </ul>

    </div>
  )

}

export default App