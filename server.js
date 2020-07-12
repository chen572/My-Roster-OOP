const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const router = require('./server/routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'classes')))

app.use('/', router)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is up and listening on ${PORT}`)
})