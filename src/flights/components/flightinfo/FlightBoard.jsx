import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'qs';
import moment from 'moment';
import { useParams, useLocation } from 'react-router-dom';
import { showFlightsListSelector } from '../../flights.selectors';
import * as flightsAction from '../../flights.actions';
import FlightBoardBody from './FlightBoardBody';

const FlightBoard = ({ flightData, getFlightList, showFlightNumber, showFlightData }) => {
  const { direction } = useParams();

  const flightNumber = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }).search;

  useEffect(() => {
    showFlightNumber(flightNumber);
    getFlightList(direction);
  }, [direction, flightNumber]);

  let isFlights;

  if (flightData && flightData.length > 0) {
    isFlights = flightData
      .map(flight => {
        const destination = flight['airportToID.name'] || flight['airportFromID.name'];

        const statusName = direction === 'departures' ? 'Took of' : 'Landed';

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
      })
      .map(flight => <FlightBoardBody key={flight.id} {...flight} />);
  } else {
    isFlights = (
      <tr className="not-found">
        <td colSpan="6">
          <span>No flights</span>
        </td>
      </tr>
    );
  }

  return (
    <div className="flight-board">
      <table className="flight-board-table">
        <thead className="flight-board-table__head">
          <tr className="flight-board-table__head-title">
            <th>Терминал</th>
            <th>Расписание</th>
            <th>Направление</th>
            <th>Статус</th>
            <th>Авиакомпания</th>
            <th>Рейс</th>
          </tr>
        </thead>
        <tbody className="flight-board-table__body">{isFlights}</tbody>
      </table>
    </div>
  );
};

FlightBoard.propTypes = {
  flightData: PropTypes.array,
  getFlightList: PropTypes.func.isRequired,
  showFlightNumber: PropTypes.func,
};

const mapState = state => {
  return {
    flightData: showFlightsListSelector(state),
  };
};

const mapDispatch = {
  getFlightList: flightsAction.getFlightList,
  showFlightNumber: flightsAction.showFlightNumber,
  showFlightData: flightsAction.showFlightData,
};

export default connect(mapState, mapDispatch)(FlightBoard);
