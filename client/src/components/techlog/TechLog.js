import React, { Fragment, useEffect } from 'react';
import TechLogItems from './TechLogItems';
import { connect } from 'react-redux';
// import { getLogs } from '../../actions/logActions';
import PropTypes from 'prop-types';
import Preloader from '../layout/Preloader';
import SearchBar from '../layout/SearchBar';

const TechLog = ({ log: { logs, loading } }) => {
  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <ul className='collection with-header '>
        <li className=' center-align collection-header no-border'>
          <h5>User Logs</h5>
        </li>

        <SearchBar />
        {loading && logs.length === 0 ? (
          <p>No User Logs to Show...</p>
        ) : (
          logs.map((log) => <TechLogItems key={log._id} log={log} />)
        )}
      </ul>
    </Fragment>
  );
};

TechLog.propTypes = {
  log: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  log: state.log
});
export default connect(mapStateToProps)(TechLog);
