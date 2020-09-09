require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const db = require('./db')
const port = process.env.PORT || 8000
const app = express()
const { DB_HOST, DB_NAME, DB_PASS, DB_USER } = process.env
const response = require('./response')

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`

const Test = require('./Models/test')

db(mongoUrl)

app.use(bodyParser.json())
app.use(morgan('dev'))


app.get('/test', async (req, res) => {
  let filter
  const query = req.query.id || null
  query != null ? filter = { _id: query } : filter = {}
  try {
    const data = await Test.find(filter)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Error interno', 500, error)
  }
})

app.post('/test', async (req, res) => {
  try {
    const test = new Test(req.body)
    const data = await test.save()
    response.success(req, res, data, 201)
  } catch (error) {
    response.error(req, res, 'Error interno', 500, error)
  }
})

app.delete('/test', async (req, res) => {
  try {
    const data = await Test.deleteOne({ _id: req.query.id })
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Error interno', 500, error)
  }
})

app.listen(port, () => {
  console.log(`Servidor dentro de http://localhost:${port}`)
})
