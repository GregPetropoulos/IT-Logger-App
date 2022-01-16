import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { filterLogs, clearFilter } from '../../actions/logActions';
import PropTypes from 'prop-types';

const LogFilter = ({ filterLogs, clearFilter, filtered }) => {
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterLogs(e.target.value);
    } else {
      clearFilter();
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
              placeholder='Search Logs...'
              ref={text}
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
