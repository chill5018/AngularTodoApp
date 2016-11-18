// Import dependencies

import express from 'express'
// Logs each server request to the console
import logger from 'morgan'
// Takes information from POST requests and puts it into an object
import bodyParser from 'body-parser'
// Allows for PUT and DELETE methods to be used in browsers where they are not supported
import methodOverride from 'method-override'
// Wrapper for interacting with MongoDB
import mongoose from 'mongoose'
// File path utilities to make sure we're using the right type of slash (/ vs \)
import path from 'path'


// Configure Database

// Connect to  MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB')
// Make sure Mongo is running
mongoose.connection.on('error', function() {
  console.log('MongoDB connection error. please make sure MongoDB is running')
  process.exit(1)
})

// Configure App

// Creates an Express App
let app = express()
// Set port to 3000 or the provided PORT variable
app.set('port', process.env.PORT || 3000)
//Set our views directory to be '/views' (in the app root, which is one level above)
app.set('views', path.join(__dirname, '..','views'))
//Set our view engine to be jade (so when we render these views they are compiled by the jade compiler)
app.set('view engine', 'jade')
// Set the static files directory - /public will be / on the frontend
app.use(express.static(path.join(__dirname, '..', 'public')))
// Log requests to the console
app.use(logger('dev'))
// Parse JSON data and put it into an object which we can access
app.use(bodyParser.json())
// Allow PUT/DELTE
app.use(methodOverride())


// Start App

app.listen(app.get('port'), function() {
  console.log(`App listening on port ${app.get('port')}!`)
})
