const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.API_PORT || 3000

// Use morgan to log http requests
app.use(
  morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms',
  ),
)

// Use bodyparser middleware to parse the various inputs
app.use(bodyParser.json({ limit: '10mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 10000,
  }),
)

// Load root route
app.get('/', (req, res) => res.status(200).json({ message: 'My API' }))

const array = [
  {
    id: 1,
    name: 'myFirstItem',
  },
  {
    id: 2,
    name: 'mySecondItem',
  },
  {
    id: 3,
    name: 'myThirdItem',
  },
]

let index = 3

app.get('/items', (req, res) => res.status(200).json(array))

app.get('/items/:id', (req, res) => {
  // Exactement équivalent à const id = req.params.id
  const { id } = req.params

  const item = array.find((e) => e.id == id)

  if (item == null) {
    return res.status(400).json({ error: `param ${id} not known` })
  }

  return res.status(200).json(item)
})

app.post('/items', (req, res) => {
  console.log(req.body)
  const { name } = req.body

  if (name == null || typeof name !== 'string') {
    return res.status(400).json({
      error: `"name" not found in body or was not a string (inputed: ${name})`,
    })
  }

  index += 1

  const item = { id: index, name }

  array.push(item)

  return res.status(200).json(item)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
  })
}

module.exports = app
