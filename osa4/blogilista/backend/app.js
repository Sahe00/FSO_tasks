const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

const app = express()

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message)
    })


app.use(express.static('dist'))         // server static files
app.use(express.json())                 // parse JSON body
app.use(middleware.requestLogger)       // log the request

app.use('/api/blogs', blogsRouter)      // handle routes

app.use(middleware.unknownEndpoint)     // handle 404s
app.use(middleware.errorHandler)        // handle errors

module.exports = app