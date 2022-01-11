import React from 'react';
import { connect } from 'react-redux';
import { setCurrent } from '../../actions/logActions';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';


const LogSelectOptions = ({log:{logs}, setCurrent}) => {
  // useEffect(() => {
  //   getLogs();
  //   // eslint-disable-next-line
  // }, []);
  // !loading &&
  // logs !== null &&
  return (
      <option
        // value={`${l._id} ${l.date} ${l.attention} ${l.message} ${l.tech._id}`}
        // onChange={() => setCurrent(log)}
        // onSelect={() => setCurrent(l)}
        value={logs}
        >
        Log ID#: {logs._id} Date: {logs.date} Attention:{logs.attention}
      </option>
  );
};

 LogSelectOptions.propTypes = {
   log: PropTypes.object.isRequired,
   setCurrent:PropTypes.func.isRequired

 };

const mapStateToProps = (state) => ({
  log: state.log
});

export default connect(mapStateToProps, {setCurrent})(LogSelectOptions);
