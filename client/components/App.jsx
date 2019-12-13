import React from 'react'
import { connect } from 'react-redux'
import { fetchFlights } from '../actions'
import { HashRouter as Router, Route } from 'react-router-dom'
import Flightdata from './Flightdata'
import Navbar from './Navbar'
import Flightmap from './Flightmap'
import Howitworks from './Howitworks'



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  componentDidMount() {
    // this.props.dispatch(fetchFlights())
    setInterval(() => { this.setState({}), this.props.dispatch(fetchFlights()) }, 10000)
  }





  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path='/' component={Flightmap} />
        <Route exact path='/data' component={Flightdata} />
        <Route exact path='/howitworks' component={Howitworks} />
      </Router>

    )
  }
}

const mapStateToProps = state => {
  return {
    flightData: state
  }
}

export default connect(mapStateToProps)(App)

