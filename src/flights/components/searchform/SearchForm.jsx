import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { showFlightDirectionSelector } from '../../flights.selectors.js';

import './searchForm.scss';

const SearchForm = ({ direction }) => {
  const [searchInfo, setSearchInfo] = useState('');

  const isDirection = direction === 'departures' ? 'departures' : 'arrivals';

  const searchParam = searchInfo ? `?search=${searchInfo}` : '';

  return (
    <section className="search-section">
      <h2 className="title">поиск рейса</h2>
      <div className="search-line-container">
        <form className="search-form" name="searchFlightForm">
          <i className="fas fa-search"></i>
          <input
            className="search-form__input"
            type="text"
            placeholder="Номер рейса или город"
            value={searchInfo}
            onChange={e => setSearchInfo(e.target.value)}
          />
          <Link style={{ textDecoration: 'none' }} to={`/flights/${isDirection}${searchParam}`}>
            <div className="search-btn">Найти</div>
          </Link>
        </form>
      </div>
    </section>
  );
};

const mapState = state => {
  return {
    direction: showFlightDirectionSelector(state),
  };
};

SearchForm.propTypes = {
  direction: PropTypes.string,
};

export default connect(mapState)(SearchForm);
