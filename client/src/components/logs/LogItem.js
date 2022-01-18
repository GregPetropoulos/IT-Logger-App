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
    <li className='collection-item avatar logbox'>
      <i className='medium material-icons'>account_circle</i>
      <h5>
        {firstName} {lastName}
      </h5>
      Posted on {formatDate(log.date)}
      <p>
        <span>
          <strong>Message:</strong>
          {log.message}
        </span>{' '}
        <br />
        <span>Log ID # {log._id.slice(18, 24)}</span>
      </p>
      {log.attention && (
        <a
          href='#!'
          className=' btn-small center z-depth-2 valign-wrapper red secondary-content '>
          <p className=' black-text'>Attention</p>
        </a>
      )}
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
