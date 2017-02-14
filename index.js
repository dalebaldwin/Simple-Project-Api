const express = require('express')
const bodyParser = require('body-parser')
const expressMongoDb = require('express-mongo-db')

const app = express()

// Database name 

const database = 'databaseName'

// API Name and Basic Port Config

const apiName = 'MyapiName'
const apiVersion = "1.0.0"
const apiPort = 3000

app.use(expressMongoDb("mongodb://localhost:27017/" + database))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())

// Root Route that returns nothing

app.get('/', function (req, res) {
    res.send(apiName + " version " + apiVersion)
})

// Custom Endpoints

app.use('/v1/', require('./endpoints/v1/exampleEndpoint.js'))

app.listen(apiPort, function () {
    console.log(apiName + " version " + apiVersion + " is up and running on port " + apiPort)
})