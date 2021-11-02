import moment from 'moment';
import { createSelector } from 'reselect';

export const showFlightsListSelector = state => state.flights.flightsData;

export const showFlightNumberSelector = state => state.flights.flightNumber;

export const showFlightDirectionSelector = state => state.flights.direction;

export const showFilteredListSelector = createSelector(
  [showFlightsListSelector, showFlightNumberSelector, showFlightDirectionSelector],
  (flightList, flightNumber, flightsDirection) => {
    if (!flightList) {
      return flightList;
    }
    return flightList
      .map(flight => {
        const destination = flight['airportToID.name'] || flight['airportFromID.name'];

        const statusName = flightsDirection === 'departures' ? 'Took of' : 'Landed';

        const statusTime =
          flight.status === 'DP'
            ? moment(flight.timeDepFact).format('h:mm')
            : moment(flight.timeLandFact).format('h:mm');

        const status = `${statusName} ${statusTime}`;

        return {
          id: flight.ID,
          terminal: flight.term,
          schedule: moment(flight.timeToStand).format('h:mm'),
          destination,
          status,
          companyLogoSource: flight.airline.en.logoSmallName,
          companyName: flight.airline.en.name,
          flightNum: flight.codeShareData[0].codeShare,
        };
      })
      .filter(flight => {
        if (!flightNumber) {
          return flight;
        }
        return flight.flightNum.toLowerCase().includes(flightNumber.toLowerCase());
      });
  },
);
