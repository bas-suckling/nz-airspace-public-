import request from 'superagent'

export function getFlightsApi() {
    return request
        .get('/api/v1/flights')
        .then(res => res)
}

export function scrapeFlightData(callsign) {
    return request
        .get('/api/v1/scraper/'+callsign)
        .then(res => (shapeData(res.text)))
}

function shapeData(uglyData) {
    //takes in scraped html text and returns a JSON object
    let splitDataArray = uglyData.split('__NEXT_DATA__ = ')
    let splitDataString = ((splitDataArray[1].replace(/\\/g, '')))
    let splitDataArray2 = splitDataString.split(',"chunks"')
    let shapedData = (JSON.parse(splitDataArray2[0] + '}'))
    return organiseData(shapedData)
}

function organiseData(shapedData) {
    let flightData = shapedData.props.initialState.flightTracker.flight
    let organisedData = {
        carrier: flightData.ticketHeader.carrier.name,
        fs: flightData.ticketHeader.carrier.fs,
        number: flightData.ticketHeader.flightNumber,
        date: flightData.departureAirport.date,
        departure: {
            city: flightData.departureAirport.city,
            name: flightData.departureAirport.name,
            scheduledDeparture: flightData.departureAirport.times.scheduled.time24,
            actualDeparture: flightData.departureAirport.times.estimatedActual.time24
        },
        arrival: {
            city: flightData.arrivalAirport.city,
            name: flightData.arrivalAirport.name,
            scheduledArrival: flightData.arrivalAirport.times.scheduled.time24,
            actualArrival: flightData.arrivalAirport.times.estimatedActual.time24
        },
        duration: flightData.additionalFlightInfo.flightDuration
    }
    return organisedData
}

