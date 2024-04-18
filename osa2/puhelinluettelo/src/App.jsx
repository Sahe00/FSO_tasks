import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterComponent = ({ newFilter, handleFilter }) => (
  <div>
    filter shown with: <br></br>
    <input value={newFilter} onChange={handleFilter}></input>
  </div>
)

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
        <div>name:<br></br> <input value={newName} onChange={handlePersonChange}/></div>
        <div>number:<br></br> <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><br></br><button type="submit">add</button></div>
    </form>
)

const Persons = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = newFilter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
      )
    : persons;


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
      <h1>Phonebook</h1>
      <FilterComponent newFilter={newFilter} handleFilter={handleFilter}/>
      <h2> Add a new </h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonChange={handlePersonChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App