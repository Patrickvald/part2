import { useState, useEffect } from 'react'
import Button from './components/Button'
import Form from './components/Form'
import Input from './components/Input'
import Persons from './components/Persons'
import noteServices from './services/notes'
import Alerta from './components/Alerta'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchedWord, setSearchedWord] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [searchPersons, setSearchPersons] = useState([])
  const [contador, setContador] = useState(0)
  const [alertMessage, setAlertMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(()=>{
    noteServices.getAll()
      .then(datos => {
        setPersons(datos)
        setSearchPersons(datos)
      })
  },[])

  const handleChangeName = (event)=>{
    setNewName(event.target.value)
  }

  const handleChangePhone = (event)=>{
    setNewPhone(event.target.value)
  }
  const handleChangeSearch = (event)=>{
    setSearchedWord(event.target.value)
  }

  const addName = (event)=>{
    event.preventDefault()
    setBuscando(false)
    const id = persons.length+1 + contador
    const newId = id.toString()
    const newEntry ={
      id: newId,
      name: newName,
      phone: newPhone}
    if(persons.some(person=> person.name === newEntry.name)){
      updateContact(newEntry)
      return
    }
 
    if(validationNumber(newEntry.phone)){
      noteServices.createContact(newEntry)
      .then(returnedNote =>{
        setPersons(persons.concat(returnedNote))
        setAlertMessage('Contact added successfully')
        setTimeout(() => {
          setAlertMessage('')
        }, 3000);

        setNewName('')
        setNewPhone('')
      })
    }
     
  }
  const validationNumber = (number)=>{
    if(!Number(number)){
      setAlertMessage('The number is not valid')
      setError(true)
      setTimeout(() => {
        setAlertMessage('')
        setError(false)
      }, 3000);
      return false
    }
    else
      return true
  }

  const updateContact =(newEntry)=>{
    console.log('He entrado a update')
    if(window.confirm('Do you wanna change the number of this existing contact?')){
      if(validationNumber(newEntry.phone)){
        const contact = persons.filter(person => person.name === newEntry.name)
        const contactUpdate = {...newEntry, id: contact[0].id}
        noteServices.updateContact(contact[0].id, contactUpdate)
        .then(returnedNote =>{
          setPersons(persons.map(person => person.id!== contact[0].id? person: returnedNote))
          setNewName('')
          setNewPhone('')
          console.log(newName)
        }).catch(error =>{
          setError(true)
          setAlertMessage('This contant has been deleted from the server, refresh the page please')
          setTimeout(() => {
            setError(false)
            setAlertMessage('')
            console.log(error)
            window.location.reload()
          }, 3000);
        })
      }
    setAlertMessage('Contact updated successfully')
    setTimeout(() => {
        setAlertMessage('')
    }, 3000);
    setNewName('')
    setNewPhone('')
    }
  }

  const handleSearch = ()=>{
    const filtratedPersons = persons.filter(person => person.name.toLowerCase().startsWith(searchedWord.toLowerCase()))
    if(filtratedPersons !== ''){
      setBuscando(true)
      setSearchPersons(filtratedPersons)
    }
  }

  const handleDelete = (id)=>{
    if(window.confirm('Do you really want to delete this contact?')){
      noteServices.deleteContact(id)
      .then(retorno =>{
        setPersons(persons.filter(person => person.id !== retorno.id))
        setSearchPersons(persons.filter(person => person.id !== retorno.id))
        setContador(contador+1)
        setAlertMessage('Contact deleted successfully')
        setTimeout(() => {
          setAlertMessage('')
        }, 3000);
      }).catch(error =>{
        setError(true)
        setAlertMessage('This contant has been already deleted from the server, refresh the page please')
        setTimeout(() => {
          setError(false)
          setAlertMessage('')
          console.log(error)
          window.location.reload()
        }, 3000);
      })
    }

  }

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <div>
          Filter shown with: <Input value={searchedWord} action={handleChangeSearch}/>
          <Button text = 'Search' handle={handleSearch}/>
        </div>
        <h2>Add a new</h2>
        <Form addName={addName} newName={newName} newPhone={newPhone} handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}/>
        {alertMessage !== ''? <Alerta message={alertMessage} error={error}/> : null}      
        <h2>Numbers</h2>
          <Persons condition={buscando} normalList={persons} searchedList={searchPersons} deleted={handleDelete}/>
      </div>
    </>
  )
}

export default App
