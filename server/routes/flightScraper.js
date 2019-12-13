const express = require('express')
const router = express.Router()

const apiRequest = require ('superagent')

const scraperURL = `https://www.flightstats.com/v2/flight-tracker/` 

function shapeURL(callSign) {
   switch (callSign.substring(0,3)) {
        case 'ANZ': //Air New Zealand
            return 'NZ/' + callSign.substring(3)
        case 'JST': //Jet Star
            return 'JQ/' + callSign.substring(3)
        case 'QFA': //Quantas
            return 'QF/' + callSign.substring(3)
        case 'VOZ': //Virgin Australia
            return 'VA/' + callSign.substring(3)
        case 'FJI': //Fiji Airways
            return 'FJ/' + callSign.substring(3)
        case 'SCR': //Jet Star Codeshare
            return 'JQ/' + callSign.substring(3)
        case 'UAE': //Emirates
            return 'EK/' + callSign.substring(3)
        case 'CPA': //Cathay Pacific
            return 'CX/' + callSign.substring(3)
        case 'RLK': //Air NZ Codeshare
            return 'NZ/8' + callSign.substring(3)    
        case 'CSN': //China Southern
            return 'CZ/' + callSign.substring(3)
        case 'CAL': //China Airlines
            return 'CI/' + callSign.substring(4)
        case 'THA': //Thai Airways
            return 'TG/' + callSign.substring(4)  
        case 'HAL': //Hawaiian Airlines
            return 'HA/' + callSign.substring(3)   
        case 'UAL': //United Airlines
            return 'UA/' + callSign.substring(3)  
        case 'NZM': //Air NZ Codeshare Mt Cook
            return 'NZ/' + '5' + callSign.substring(3)   
        default:
            return 'Plane information not found'
   }
   
}

router.get('/:callsign', (req,res) => {
    let callSign = req.params.callsign
    apiRequest
    .get(scraperURL+shapeURL(callSign))
    .then(x => res.send(x))
    .catch(err => res.send(err.status))
})

module.exports = router
