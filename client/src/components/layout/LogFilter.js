import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterLogs, clearFilter } from '../../actions/logActions';
import PropTypes from 'prop-types';

const LogFilter = ({ filterLogs, clearFilter, filtered }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (filtered === null) {
      textRef.current = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    textRef.current = e.target.value;
    if (textRef.current === '') {
      clearFilter();
    } else {
      filterLogs(textRef.current);
    }
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              required
              placeholder='Search Logs by message,date,first or last name...'
              ref={textRef}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};
LogFilter.propTypes = {
  filterLogs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log
});
export default connect(mapStateToProps, { filterLogs, clearFilter })(LogFilter);
