import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons/'


const create = (newName, newNumber) => {
    const personObject = {
        name: newName,
        number: newNumber
      }
    const request = axios.post(baseUrl, personObject)
    return request.then(response => response.data)
}

const remove = (val) => {
    console.log(val)
    const request = axios.delete(`${baseUrl}${val}`)
    return request.then(response => response)
}

const update = (id, newObject) => {
    console.log(newObject)
    const request = axios.put(`${baseUrl}${id}`, newObject);
    return request.then(response => response.data);
}


export default { create, remove, update }