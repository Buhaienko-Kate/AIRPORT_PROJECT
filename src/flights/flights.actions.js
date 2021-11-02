import { fetchFlights } from '../flightsGateway';

export const SHOW_DATA = 'FLIGHTS/SHOW_DATA';
export const SHOW_NUMBER = 'FLIGHTS/SHOW_NUMBER';
export const SHOW_DIRECTION = 'FLIGHTS/SHOW_DIRECTION';

export const showFlightData = flightsData => {
  const action = {
    type: SHOW_DATA,
    payload: {
      flightsData,
    },
  };
  return action;
};

export const showFlightNumber = flightNumber => {
  return {
    type: SHOW_NUMBER,
    payload: {
      flightNumber,
    },
  };
};

export const getFlightDirection = direction => {
  return {
    type: SHOW_DIRECTION,
    payload: {
      direction,
    },
  };
};

export const getFlightList = direction => dispatch => {
  const flightDirection = direction === 'departures' ? 'departure' : 'arrival';
  fetchFlights().then(flightsData => {
    dispatch(getFlightDirection(direction));
    dispatch(showFlightData(flightsData.body[flightDirection]));
  });
};
