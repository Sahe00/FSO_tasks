import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import FilterComponent from './components/Filter'
import personsService from './services/persons'

// App: Root component managing state and logic
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // Fetch initial data from the server
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
      .catch((error) => {
        alert('Failed to fetch data from the server.');
      })
  }, [])

  // Add a new person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!personSame(personObject)) {
      personsService
      .create(personObject)
      .then((returnedPerson) => {
        console.log("New person added:", returnedPerson); //DEBUG
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => {
        alert("Failed to add the person to the phonebook.")
      })
    }   
  }

  // Check if a person with the same name already exists
  const personSame = (personObject) => {
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.confirm(`'${newName}' is already added to phonebook. Would you like to update the number?`)
      personsService
        .update(persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id, personObject)
        .then((returnedPerson) => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        })
        .catch((error) => {
          alert("Failed to update the phonebook.")
        })
      
      return true;
    } else {
      return false;
    }
  }

  // Delete a person from the phonebook
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you want to delete '${name}' from the phonebook?`)) {
      personsService
        .personDelete(id)
        .then((deleteFeedback) => {
          console.log("Person has been deleted:", deleteFeedback); //DEBUG
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          alert(`Failed to delete '${name}' from the phonebook.`)
        })
    }
  }


  // Handle changes in the name input field
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // Handle changes in the number input field
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // Handle changes in the filter input field
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  // Filter persons based on the filter input
  const filteredPersons = newFilter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLocaleLowerCase())
      )
    : persons;

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
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App