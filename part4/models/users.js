const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog'
    }
  ],
  name: String,
  passwordHash: String
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User
