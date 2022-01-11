import React from 'react';
//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({
  log: {
    tech: { firstName, lastName }
  },
  log
}) => {
  return (
    <li className='collection-item avatar'>
      <i className='medium material-icons'>account_circle</i>
      <h5>
        {firstName} {lastName}
      </h5>
      Posted on {formatDate(log.date)}
      <p className='collection-item'>
        <span>
          <strong>Message:</strong>
          {log.message}
        </span>{' '}
        <br />
        <span>Log ID # {log._id.slice(18, 24)}</span>
      </p>
      {log.attention && (
        <p className=''>
          <a href='#!' className=' valign-wrapper red secondary-content '>
            <i className='material-icons md-24 md-dark'>priority_high</i>
            <span className='black-text'>Attention</span>
          </a>
        </p>
      )}
      <p>Todays Date{formatDate(new Date())}</p>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
};

export default (LogItem);
