const path = require('path')
const express = require('express')
const flights = require('./routes/flightsApi')
const flightScraper = require('./routes/flightScraper')

const server = express()

server.use('/api/v1/flights', flights) //this pulls in from the flight tracker api
server.use('/api/v1/scraper', flightScraper)


server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server
