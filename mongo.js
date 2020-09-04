const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://jinjie520:${password}@cluster0.d0z9t.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// })

// person.save().then((result) => {
//   console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
//   mongoose.connection.close()
// })

Person.find({}).then((result) => {
  console.log('phonebook:')
  result.forEach((p) => {
    console.log(`${p.name} ${p.number}`)
  })
  mongoose.connection.close()
})
