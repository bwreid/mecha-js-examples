const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
const { JSONMecha } = require('mecha-js')

app.use(require('body-parser').json())
app.use(require('morgan')('dev'))

const data = path.join(__dirname, 'data.json')
const mecha = new JSONMecha(data)

app.get('/resources', (req, res) => {
  const { limit, offset } = req.query
  const resources = mecha.get({ limit, offset })
  res.json(resources)
})

app.get('/resources/:index', (req, res) => {
  const index = parseInt(req.params.index)
  const resource = mecha.find({ index })
  res.json(resource)
})

app.post('/resources', (req, res) => {
  const resources = mecha.create(req.body)
  res.status(201).json(resources)
})

app.put('/resources/:index', (req, res) => {
  const index = parseInt(req.params.index)
  const result = mecha.update({ index }, req.body)
  res.json(result)
})

app.delete('/resources/:index', (req, res) => {
  const index = parseInt(req.params.index)
  const result = mecha.destroy({ index })
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
