import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const baseUrlTEST = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getData = (newFilter) => {
    const request = axios.get(`${baseUrlTEST}${newFilter}`)
    return request.then(response => response.data)
}

export default {
    getData
}