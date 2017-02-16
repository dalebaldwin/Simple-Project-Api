const express = require('express')
const bodyParser = require('body-parser')
const expressMongoDb = require('express-mongo-db')
const config = require('./config')
const app = express()

app.use(expressMongoDb("mongodb://localhost:27017/" + config.database))
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())

// Root Route that returns nothing

app.get('/', function (req, res) {
    res.send(config.apiName + " version " + config.apiVersion)
})

// Custom Endpoints

app.use('/v1/', require('./endpoints/v1/exampleEndpoint.js'))

app.listen(config.apiPort, function () {
    console.log(config.apiName + " version " + config.apiVersion + " is up and running on port " + config.apiPort)
})