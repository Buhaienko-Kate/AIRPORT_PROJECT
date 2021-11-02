import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { Link, Route } from 'react-router-dom';
import { showFlightNumberSelector, showFlightDirectionSelector } from '../../flights.selectors.js';
import FlightBoard from './FlightBoard';
import './flightinfo.scss';

const FlightInfo = ({ fligtNumber, direction }) => {
  const searchFlight = fligtNumber ? `?search=${fligtNumber}` : '';

  const style = {
    textDecoration: 'none',
  };

  return (
    <div className="main-board">
      <div className="flight-requests">
        <div className="flight-requests__nav-item">
          <Link style={style} to={`/flights/departures${searchFlight}`}>
            <button
              className={classNames('flight-requests__departure-btn', 'btn', {
                choosen: direction === 'departures',
              })}
            >
              <div>
                <FontAwesomeIcon icon={faPlaneDeparture} />
              </div>
              <span className="flight-requests__text">Вылет</span>
            </button>
          </Link>
        </div>
        <div className="flight-requests__nav-item">
          <Link style={style} to={`/flights/arrivals${searchFlight}`}>
            <button
              className={classNames('flight-requests__arrival-btn', 'btn', {
                choosen: direction === 'arrivals',
              })}
            >
              <div>
                <FontAwesomeIcon icon={faPlaneArrival} />
              </div>
              <span className="flight-requests__text">Прилет</span>
            </button>
          </Link>
        </div>
      </div>
      <Route exact path={`/flights/:direction`}>
        <FlightBoard />
      </Route>
    </div>
  );
};

FlightInfo.propTypes = {
  fligtNumber: PropTypes.string,
  direction: PropTypes.string.isRequired,
};

const mapState = state => {
  return {
    fligtNumber: showFlightNumberSelector(state),
    direction: showFlightDirectionSelector(state),
  };
};

export default connect(mapState)(FlightInfo);
