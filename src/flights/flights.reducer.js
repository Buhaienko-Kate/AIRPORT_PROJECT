import { SHOW_DATA, SHOW_NUMBER, SHOW_DIRECTION } from './flights.actions';

const initialState = {
  flightsData: null,
  flightNumber: '',
  direction: '',
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DATA:
      return {
        ...state,
        flightsData: action.payload.flightsData,
      };
    case SHOW_NUMBER:
      return {
        ...state,
        flightNumber: action.payload.flightNumber,
      };
    case SHOW_DIRECTION:
      return {
        ...state,
        direction: action.payload.direction,
      };
    default:
      return state;
  }
};

export default flightsReducer;
