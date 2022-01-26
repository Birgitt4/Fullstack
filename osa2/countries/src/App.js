import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = (props) => {
  const {country} = props
  console.log(country.languages)
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital} <br></br>
      area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='Flag' />
    </div>
  )
}

const CountryName = (props) => {
  const {handleButton, name} = props
  return (
    <div>
      {props.name}
      <button type='button' onClick={() => {
        handleButton(name)
      }} >Show</button>
    </div>
  )
}

const Content = (props) => {
  const {countries, handleButton} = props
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify filter</div>
    )
  }
  else if (countries.length === 1) {
    return (
      <div>
        {countries.map(country =>
          <Country key={country.name.common} country={country} />
        )}
      </div>
    )
  }
  return (
    <div>
      {countries.map(country =>
        <CountryName key={country.name.common} name={country.name.common} handleButton={handleButton} />
      )}
    </div>
  )
}

const Filter = (props) => {
  const {newFilter, handleFilter} = props
  return (
    <div>
      find countries <input value={newFilter} onChange={handleFilter}/>
    </div>
  )
}

const App = (props) => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
    })
  }, [])

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleButton = (name) => {
    setNewFilter(name)
  }
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <Content countries={countriesToShow} handleButton={handleButton} />
    </div>
  )
}

export default App;
