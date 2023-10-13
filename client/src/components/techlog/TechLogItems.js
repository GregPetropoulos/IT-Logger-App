//!moment deprecated
import formatDate from '../../utils/formatDate';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const TechLogItems = ({
  logItem,
  auth: {
    tech: { _id }
  }
}) => {
  return (
    <>
      { _id === logItem.tech._id && (
        <div>
          <div className='center collection with-header grey darken-2 z-depth-3 p-1'>
            <p>Posted on {formatDate(logItem.date)} </p>
          </div>
          {logItem.attention&&
          <div className='p-1'>
            <a
              href='#!'
              className=' right-align valign-wrapper red secondary-content'>
              <i className='material-icons md-dark'>priority_high</i>
              <span className='black-text p-5'>Attention</span>
            </a>
          </div>}
          <div className='collection-item active grey darken-3 white-text'>
            <p className=' '>
              <strong>Message: </strong>
              {logItem.message}
            </p>
            <span>
              <strong>Log ID #</strong> {logItem._id.slice(18, 24)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

TechLogItems.propTypes = {
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(TechLogItems);
