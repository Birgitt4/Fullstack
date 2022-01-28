import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = (props) => {
  return (
    <p>
      {props.name} {props.number} <button onClick={props.deletePerson}>delete</button>
    </p>
  )
}

const Persons = (props) => {
  const {persons, deletePerson} = props
  return (
    <div>
      {persons.map((person) =>
        <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>
      )}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {
  const {newFilter, handleFilter} = props
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilter}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person !== undefined) {
      const sure = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (sure) {
        updatePerson(person)
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = person => {
    console.log(`wanting to upddat person ${person.name}`)
    const changedPerson = {...person, number: newNumber}
    
    personService
      .update(person.id, changedPerson)
      .then(updated => {
        setPersons(persons.map(p => p.id !== person.id ? p : updated))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const sure = window.confirm("u sure?")
    if (sure) {
      console.log('sure')
      personService.delet(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    setShowAll((newFilter === '' ? true : false))
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )

}

export default App