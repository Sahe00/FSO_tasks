// CountryList: filters through the available countries by the typed input
const CountryList = ({ countries, filter }) => {
    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if (filtered.length > 10) {
        return <div>Too many matches, specify another filter.</div>
    }  
    
    if (filtered.length === 1) {
        const country = filtered[0]
        console.log("This is the thing", country)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital: {country.capital && country.capital[0]}</div>
                <div>Area: {country.area} </div>
                <h2>Languages</h2>
                <ul>
                    {country.languages &&
                    Object.values(country.languages).map(lang => (
                        <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
            </div>
        )
    } 

    return (
        <ul>
            {filtered.map(country => (
                <li key={country.cca3}>{country.name.common}</li>
            ))}
        </ul>
    )
}

export default CountryList