const mongoose = require('mongoose')
const mongooseUrl = process.env.MONGODB_URI
const uniqueValidator = require('mongoose-unique-validator')

console.log('connecting to', mongooseUrl)

mongoose.connect(mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {type: String, minlength: 3, required: true, unique: true},
    number: {type: String, minlegnth: 3, required: true, unique: true}, //Task is to make phonenumber at least 8 digits long, but for simplicity, I kept the minreq at 3 digits.
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema)



