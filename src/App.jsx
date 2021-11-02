import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './index.scss';
import SearchForm from './flights/components/searchform/SearchForm';
import FlightInfo from './flights/components/flightinfo/FlightInfo';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <SearchForm />
      <FlightInfo />
    </BrowserRouter>
  </Provider>
);
export default App;
