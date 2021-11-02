import React from 'react';
import classNames from 'classnames';

const FlightBoardBody = ({
  terminal,
  schedule,
  destination,
  status,
  companyLogoSource,
  companyName,
  flightNum,
}) => {
  return (
    <>
      <tr className="flight-board-table__body-flight-info">
        <td
          className={classNames('terminal-field', {
            'terminal-a': terminal === 'A',
            'terminal-b': terminal === 'B',
            'terminal-d': terminal === 'D',
          })}
        >
          <span className="terminal-name">{terminal}</span>
        </td>
        <td className="time-field">{schedule}</td>
        <td className="way-field">{destination}</td>
        <td className="status-field">{status}</td>
        <td className="company-name">
          <img className="company-name__logo" src={companyLogoSource} alt="company-logo" />
          <span className="company-name__name">{companyName}</span>
        </td>
        <td className="flight-field">{flightNum}</td>
      </tr>
    </>
  );
};

export default FlightBoardBody;
