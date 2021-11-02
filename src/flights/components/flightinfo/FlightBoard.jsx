import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useParams, useLocation } from 'react-router-dom';
import { showFilteredListSelector } from '../../flights.selectors';
import * as flightsAction from '../../flights.actions';
import FlightBoardBody from './FlightBoardBody';

const FlightBoard = ({ flightData, getFlightList, showFlightNumber }) => {
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
    isFlights = flightData.map(flight => <FlightBoardBody key={flight.id} {...flight} />);
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
    flightData: showFilteredListSelector(state),
  };
};

const mapDispatch = {
  getFlightList: flightsAction.getFlightList,
  showFlightNumber: flightsAction.showFlightNumber,
};

export default connect(mapState, mapDispatch)(FlightBoard);
