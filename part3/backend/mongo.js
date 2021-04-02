const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('place provice a password as a argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]


const url = `mongodb+srv://juancarrer:${password}@cluster0.yvyvo.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (!newName && !newNumber) {
  Person.find({})
    .then(response => {
      response.forEach(item => {
        console.log(item)
      })
      mongoose.connection.close()
    })
    .catch(e => {
      console.error(e.message)
    })

} else {
  const newPerson = new Person({
    name: newName,
    number: newNumber
  })

  newPerson.save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
}
