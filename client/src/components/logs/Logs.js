import React, { useEffect, Fragment } from 'react';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';

// ***REDUX***
import { connect } from 'react-redux';
// this is importing a function from logActions which is passed into the connect to execute by this component
import { getLogs } from '../../actions/logActions';

// destructure app level props, getLogs gets passed as prop even though it's a function brought in
const Logs = ({ log: { logs, loading }, getLogs }) => {
  // Calling the getlogs fetch in the useEffect
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, [getLogs]);
  // *! may need getLogs in array in useEffect
  // eslint-disable-next-line
  if (loading || logs === null) {
    return <Preloader />;
  }
  console.log('check Logs COMPONENT', logs);
  return (
    <Fragment>
      <ul className='collection with-header'>
        <li className='collection-header'>
          <h4 className='center'>System Logs</h4>
        </li>
        {!loading && logs.length === 0 ? (
          <p className='center'>No Logs to Show...</p>
        ) : (
          logs.map((log) => <LogItem log={log} key={log._id} />)
        )}
      </ul>
    </Fragment>
  );
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
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
export default connect(mapStateToProps, { getLogs })(Logs);
