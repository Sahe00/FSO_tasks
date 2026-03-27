require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

let persons = [
    {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
    },
    {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
    },
    {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
    },
    {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
    }
]

morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
    const count = persons.length;
    const date = new Date().toString();
    response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
        `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        console.log(`phonebook:`)
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then((person) => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    let id = Math.floor(Math.random() * 10000).toString()
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    } 

    // Possibly replace with database version
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name already in the phonebook'
        })
    }

    const person = new Person({
        //id: generateId(),
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})