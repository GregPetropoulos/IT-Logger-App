import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';

// ***REDUX***
import { connect } from 'react-redux';

// destructure app level props, getLogs gets passed as prop even though it's a function brought in
const Logs = ({ log: { logs, loading, filtered } }) => {
  if (loading || logs === null) {
    return <Preloader />;
  }

  if (logs.length === 0) {
    return <p className='center'>No Logs to Show...</p>;
  }

  return (
    <>
      <ul className='collection with-header borderRad10 white-text'>
        <li className='collection-header grey darken-3'>
          <h4 className='center white-text'>System Logs</h4>
        </li>
        {filtered !== null
          ? filtered.map((log) => <LogItem log={log} key={log._id} />)
          : logs.map((log) => <LogItem log={log} key={log._id} />)}
      </ul>
    </>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired
};

// *Bring in the whole state
const mapStateToProps = (state) => ({
  // *log: is the prop
  // * state.log is from the root reducer index.js
  log: state.log
});

// *REDUX -the connect takes in 2 things the state and a function
// *1) If you want anything from app level state into a component as prop pass in mapStateToProps
// * 2) The getLogs function from the app level imported from logActions
export default connect(mapStateToProps)(Logs);
