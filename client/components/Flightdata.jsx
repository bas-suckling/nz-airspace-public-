import React from 'react'
import {connect} from 'react-redux'
import {timeConverter} from './unixTimestampConverter'

class Flightdata extends React.Component{
  render(){
    var flights = this.props.flightData.flights.states
    return (
      <>
      {flights ? 
      <section>
      <h2> This is the data as it comes in from the API.</h2>
      
        {flights.map((flight, i) => {
          return <article key={i}>
            <h6>icao24: {flight[0]}</h6>
            <h6>callsign: {flight[1]}</h6>
            <h6>origin_country: {flight[2]}</h6>
            <h6>time_position: {timeConverter(flight[3])}</h6>
            <h6>last_contact: {timeConverter(flight[4])}</h6>
            <h6>lat: {flight[5]}</h6>
            <h6>lng: {flight[6]}</h6>
            <hr/>
          </article>
        })}
      </section>
      : <h2>Data loading, please wait...</h2>
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

export default connect(mapStateToProps)(Flightdata)
