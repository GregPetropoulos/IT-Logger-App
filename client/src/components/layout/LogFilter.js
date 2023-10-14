import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '@mui/material/Input';
import { filterLogs, clearFilter } from '../../actions/logActions';
import PropTypes from 'prop-types';

const LogFilter = ({ filterLogs, clearFilter, filtered }) => {
  const textRef = useRef(null);
  useEffect(() => {
    if (filtered === null) {
      textRef.current = null;
    }
  }, [filtered]);

  const onChange = (e) => {
    textRef.current = e.target.value;
    if (textRef.current === '') {
      clearFilter();
    } else {
      filterLogs(textRef.current);
    }
  };

  return (
        <form>
            <Input
              id='search'
              type='search'
              required
              fullWidth
              disableUnderline
              className='white-text'
              placeholder='Search Logs by message,date,first or last name...'
              inputRef={textRef}
              onChange={onChange}
              startAdornment={
              <i className='material-icons'>search</i>

              }
              // endAdornment={
              // <i onClick={()=>{
              //   clearFilter()
              //   textRef.current=null
              // }} className='material-icons'>close</i>

              // }
            />
        </form>
  );
};
LogFilter.propTypes = {
  filterLogs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log,
  filtered:state.log.filtered
});
export default connect(mapStateToProps, { filterLogs, clearFilter })(LogFilter);
