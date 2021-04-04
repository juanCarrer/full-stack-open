const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.mongoURL

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)
  .then(() => {
    console.log('[DB] connected')
  })
  .catch((e) => {
    console.log('Error Conecting to DB', e)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: {
    type: String,
    required: true,
    unique: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() //eslint-disable-line
    delete returnedObject._id //eslint-disable-line
    delete returnedObject.__v //eslint-disable-line
  }
})

personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)
