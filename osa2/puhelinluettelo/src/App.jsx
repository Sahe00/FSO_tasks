import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123-1244'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

   if (!personSame()) {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
      }
    }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
        <div>name:<br></br> <input value={newName} onChange={handlePersonChange}/></div>
        <div>number:<br></br> <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => { 
          console.log(person)
          return (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
          );
        })}
      </ul>

    </div>
  )

}

export default App