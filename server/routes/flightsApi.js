const express = require('express')
const router = express.Router()

const apiRequest = require ('superagent')

const flightsURL = "https://opensky-network.org/api/states/all?lamin=-48&lomin=160&lamax=-30&lomax=179.99" //url for current within nz airspace

// https://opensky-network.org/apidoc/rest.html API info

router.get('/', (req,res) => {
    apiRequest
    .get(flightsURL)
    .then(x => res.send(x.body))
})

module.exports = router