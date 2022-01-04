import React, { Fragment, useEffect } from 'react';
import TechLogItems from './TechLogItems';
// import SearchBar from '../layout/SearchBar';
import { connect } from 'react-redux';
import { getLogs } from '../../actions/logActions';
import PropTypes from 'prop-types';
import Preloader from '../layout/Preloader';

const TechLog = ({ log: { logs, loading }, getLogs }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);

  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <ul className='collection-header'>
        <div className='center-align collection-item deep-purple lighten-2'>
          User Log
        </div>
        {logs.map((log) => (
          <TechLogItems key={log._id} log={log} />
        ))}
      </ul>
    </Fragment>
  );
};

TechLog.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  log: state.log
});
export default connect(mapStateToProps, { getLogs })(TechLog);
