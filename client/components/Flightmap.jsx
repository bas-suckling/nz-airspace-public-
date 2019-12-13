import React from 'react'
import { connect } from 'react-redux'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api' //https://react-google-maps-api-docs.netlify.com/ https://developers.google.com/maps/documentation/javascript/markers

import { scrapeFlightData } from '../api'


class Flightmap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentFlight: [],
      center: { lat: -41.286, lng: 174.776 },
      currentDisplay: "initialMessage"
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(flight) {
    this.setState({
      currentDisplay: "loadingMessage",
      currentFlight: []
    })
    scrapeFlightData(flight[1])
      .then(clickedFlightData =>
        this.setState({
          currentFlight: flight,
          clickedFlightData,
          currentDisplay: "planeInfoMessage"
        })
      )
      .catch(err => {
        this.setState({
          currentDisplay: "errorMessage"
        })
      }
      )
  }

  render() {
    var flights = this.props.flightData.flights.states
    return (
      <>
        {flights ?
          <div style={{ height: '65vh', width: '100%' }}>
            <h3 className='subTitle'>There are currently {flights.length} planes flying in NZ Airspace.</h3>
            <LoadScript
              id="script-loader"
              googleMapsApiKey="(ENTER YOUR API KEY HERE)"
            >
              <div className='map'>
                <GoogleMap
                  id=""
                  zoom={5.2}
                  center={this.state.center}
                  options={{
                    disableDefaultUI: true,
                    mapTypeId: 'satellite',
                    zoomControl: true,
                  }}

                  mapContainerStyle={{
                    height: '100%',
                    width: '100%'
                  }}
                >
                  {flights.map((flight, i) => {

                    return <>
                      <div className="plane">
                        <Marker
                          key={flight[1]}
                          title={`Flight Number: ${flight[1]}`}
                          position={{ lat: flight[6], lng: flight[5] }}
                          icon={'./plane.png'}
                          onClick={() => this.handleClick(flight)}
                        />
                      </div>
                    </>
                  })}
                </GoogleMap>
              </div>
            </LoadScript>
            {this.state.currentDisplay == "planeInfoMessage" &&
              <div className="container pt-5 pb-3">
                <div className="d-flex justify-content-between">
                    <div>
                      <h4>Airline: {this.state.clickedFlightData.carrier}</h4>
                      <h6>Flight: {this.state.clickedFlightData.fs}{this.state.clickedFlightData.number}</h6>
                      <h6>Flight Duration: {this.state.clickedFlightData.duration}</h6>
                    </div>
                    <div>
                      <h4>Departure City: {this.state.clickedFlightData.departure.city}</h4>
                      <h6>Scheduled Departure Time: {this.state.clickedFlightData.departure.scheduledDeparture}</h6>
                      <h6>Actual Departure Time: {this.state.clickedFlightData.departure.actualDeparture}</h6>
                    </div>
                    <div>
                      <h4>Arrival City: {this.state.clickedFlightData.arrival.city}</h4>
                      <h6>Scheduled Arrival Time: {this.state.clickedFlightData.arrival.scheduledArrival}</h6>
                      <h6>Estimated Arrival Time: {this.state.clickedFlightData.arrival.actualArrival}</h6>
                    </div>
                  </div>
                </div>
            }

            {(this.state.currentDisplay == 'initialMessage') && <h4 className="pt-5">Click on a plane to view specific information.</h4>}
            {(this.state.currentDisplay == 'loadingMessage') && <div className="pt-5"><h4>Data loading...</h4><div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
              <span className="sr-only">Loading...</span>
            </div></div>}
            {(this.state.currentDisplay == 'errorMessage') && <h4 className="pt-5">Plane information not available</h4>}


          </div>
          : <div className="pt-5"><h4>Data loading...</h4><div className="spinner-border text-light" style={{ width: "3rem", height: "3rem" }} role="status">
          </div></div>
        }
      </>

    )
  }
}

const mapStateToProps = state => {
  return {
    flightData: state
  }
}

export default connect(mapStateToProps)(Flightmap)



