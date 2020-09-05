require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors') // 解决跨域问题
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

// 打印控制台日志
morgan.token('type', function (req, res) {
  return JSON.stringify(req.body)
})
morgan.format('joke', ':method :url :status - :response-time ms :type')

app.use(morgan('joke'))

// let persons = [
//   { name: 'Arto Hellas', number: '040-123456', id: 1 },
//   { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
//   { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
//   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
// ]

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

// app.get('/info', (req, res) => {
//   const info = `<div>Phonebook has info for ${persons.length} people</div>`
//   const date = `<div>${new Date()}</div>`
//   res.send(`${info}${date}`)
// })

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then((person) => {
    res.json(person)
  })
  // const id = Number(req.params.id)
  // const person = persons.find((p) => p.id === id)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(404).end()
  // }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((p) => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  // const id = Math.random() * 1000
  if (!body.name || !body.number) {
    res.status(400).json({
      error: 'name or number missing',
    })
  }
  // const name = persons.find((p) => p.name === body.name)
  // if (name) {
  //   res.status(400).json({
  //     error: 'name must be unique',
  //   })
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((savePersons) => {
    res.json(savePersons)
  })
})

app.put('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body
  const index = persons.findIndex((p) => p.id === id)
  const person = {
    id,
    name: body.name,
    number: body.number,
  }
  persons.splice(index, 1, person)
  res.json(person)
})

const PART = process.env.PORT || 3001

app.listen(PART, () => {
  console.log(`Server running in ${PART}`)
})
