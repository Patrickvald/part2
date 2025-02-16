import axios from "axios";

const baseURL = 'http://localhost:3001/personas'

const getAll = ()=>{
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const createContact = (newPerson)=>{
    const request = axios.post(baseURL, newPerson)
    return request.then(response => response.data)
}

const deleteContact = (id) =>{
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
} 

const updateContact = (id,newContact) =>{
    const request = axios.put(`${baseURL}/${id}`, newContact)
    return request.then(response => response.data)
}

/* const findContact = (name)=>{
    const request = axios.get(``)
} */
export default {getAll, createContact, deleteContact, updateContact}