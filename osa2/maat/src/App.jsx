import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterComponent from './components/Filter'
import CountryList from './components/CountryList'
import countryService from './services/countries'


// App: Root component managing state and logic
const App = () => {
  const [newFilter, setNewFilter] = useState('') // input bar text
  const [countries, setCountries] = useState([]) // stores fetched country data
  const [search, setSearch] = useState(null)
  

  // Fetch initial data from the server
  useEffect(() => {
    console.log('effect running...')
    countryService
      .getData(newFilter)
      .then(countryData => {
        console.log('promise fulfilled')
        setCountries(countryData)
      })
      /*.catch((error) => {
        alert('Failed to fetch country data from the server.')
      })*/
  }, [newFilter])

  // Handle changes in the filter input field
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <FilterComponent newFilter={newFilter} handleFilter={handleFilter}/>
      <CountryList countries={countries} filter={newFilter}/>
    </div>
    
  )
}

export default App
