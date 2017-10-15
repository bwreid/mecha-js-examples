const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
const { JSONMecha } = require('mecha-js')

app.use(require('body-parser').json())
app.use(require('morgan')('dev'))

const data = path.join(__dirname, 'data.json')
const schema = require('./schema')
const mecha = new JSONMecha(data, schema)

app.get('/wines', (req, res) => {
  const { limit, offset } = req.query
  const wines = mecha.get({ limit, offset })
  res.json(wines)
})

app.get('/wines/:id', (req, res) => {
  const id = req.params.id
  const wine = mecha.find({ prop: [ 'id', id ] })
  res.json(wine)
})

app.post('/wines', (req, res) => {
  const wines = mecha.create(req.body)
  res.status(201).json(wines)
})

app.put('/wines/:id', (req, res) => {
  const id = req.params.id
  const result = mecha.update({ prop: [ 'id', id ] }, req.body)
  res.json(result)
})

app.delete('/wines/:id', (req, res) => {
  const id = req.params.id
  const result = mecha.destroy({ prop: [ 'id', id ] })
  res.json(result)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || `Something went wrong!`
  res.status(status).json({ error: { message } })
})

app.use((req, res) => {
  res.status(404).json({ error: { message: 'Not found.' }})
})

const listener = () => console.log(`You're listening on port ${port}`)
app.listen(port, listener)
