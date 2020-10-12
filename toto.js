const morgan = require('morgan')
const express = require('express')

const app = express()

const PORT = process.env.API_PORT || 3000

// Use morgan to log http requests
app.use(
  morgan(
    ':date[iso] :method :url :status :res[content-length] - :response-time ms',
  ),
)

// Load root route
app.get('/', (req, res) => res.status(200).json({ message: 'My API' }))

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
  })
}

module.exports = app
