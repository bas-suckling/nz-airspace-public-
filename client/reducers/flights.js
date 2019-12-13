const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_FLIGHTS':
      return action.flights
    default:
      return state
  }
}

export default reducer