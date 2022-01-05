import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const LogSelectOptions = ({ getLogs, log: { logs, loading } }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  return (
    !loading &&
    logs !== null &&
    logs.map(l => (
      <option key={l._id} value={`${l._id} ${l.tech.lastName} ${l.message}`}>
       {l._id} {l.tech.lastName} {l.message}
      </option>
    ))
  );
};

LogSelectOptions.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getLogs }
)(LogSelectOptions);