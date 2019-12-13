import {getFlightsApi} from "../api"

//this is an action creator
export function getFlights (flights) {
    return {
        type: "GET_FLIGHTS",
        flights
    }
}

export function fetchFlights () {
    return (dispatch) => {
        getFlightsApi()
        .then(res => {
            dispatch(getFlights(res.body))
        })
    }
}

