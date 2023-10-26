import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';

const LogItem = ({
  log: {
    tech: { firstName, lastName }
  },
  log
}) => {
  return (
    <li className='collection-item avatar logbox '>
      {log.attention && (
        <a
          href='#!'
          className=' attention btn-small center z-depth-2  red secondary-content '>
          <p className=' truncate black-text'>Attention</p>
        </a>
      )}
      <i className='medium material-icons hide-on-small-only '>
        account_circle
      </i>
      <h5 className='name-on-log'>
        {firstName} {lastName}
      </h5>
      <p>Posted on {formatDate(log.date)}</p>
      <p>Message: {log.message}</p>
      <br />
      <p>Log ID # {log._id.slice(18, 24)}</p>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
