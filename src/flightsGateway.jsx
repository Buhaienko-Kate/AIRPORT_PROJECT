import moment from 'moment';

const today = moment().format('DD-MM-YYYY');

const baseUrl = `https://api.iev.aero/api/flights`;

export const fetchFlights = () => {
  return fetch(`${baseUrl}/${today}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('There is nothing to show');
  });
};
