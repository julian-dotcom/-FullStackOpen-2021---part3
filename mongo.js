const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]
console.log(`password: ${password}, personName: ${personName}, personNumber: ${personNumber}`)
const url = `mongodb+srv://fullstack:${password}@cluster0.gkdt3.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})    

const Person = mongoose.model('Person', personSchema)



if (process.argv.length === 3) {
    console.log('just password entered')
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
} else {
    console.log("more than password entered")
    const person = new Person({
        name: personName,
        number: personNumber,
    })
    person.save().then(result => {
        console.log('person saved!')
        console.log(`added ${result}`)
        mongoose.connection.close()
    })
}
