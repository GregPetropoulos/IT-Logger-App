/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import { setCurrent } from '../../actions/logActions';
import Preloader from '../layout/Preloader';
// import formatDate from '../../utils/formatDate';

const EditTechLogModal = ({
  setCurrent,
  log: { logs, loading, current },
  updateLog,
  auth: { tech }
}) => {
  // LOCAL STATE UPDATES CURRENT
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);

  // *useEffect handling the edit modal remaining open due to double renders
  // *useEffect handling the the state of current as it's being watched for changes to rerender
  useEffect(() => {
    let unmount = true;
    M.AutoInit();

    const elem = document.getElementById('edit-log-modal');
    const instance = M.Modal.init(elem);

    //*Once the current is changed and true we up date the local message and attention state
    if (current && unmount) {
      instance.open();
      setMessage(current.message || '');
      setAttention(current.attention);
    }

    return () => (unmount = false);
  }, [current]);

  // *MATCH LOG ID SET STATE FOR ISMATCH,CURRENT,AND TEXT
  const selectOnChange = (e) => {
    if (e.target.value === '') {
      setCurrent('');
      setMessage('');
    }
    setText(e.target.value);
    setCurrent(logs.find((item) => item._id === e.target.value));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (message === '' || text === '') {
      M.toast({ html: 'Please enter a message' });
    } else {
      // * SET UP AN OBJECT
      const updLog = {
        id: current._id,
        message,
        attention,
        tech: current.tech._id,
        date: new Date()
      };
      // * CALL THE updateLog ACTION/PROP AND PASS IN updLog
      updateLog(updLog);
      M.toast({ html: `Log updated by ${tech.firstName}` });
    }

    //* Clear fields
    setMessage('');
    setText('');
    setAttention(false);
  };

  if (logs === null) {
    return <Preloader />;
  }

  return (
    <div>
      <div
        id='edit-log-modal'
        className='modal grey darken white-text'
        style={modalStyle}>
        <div className='modal-content'>
          <h4 className='p-1'>Edit System Logs</h4>
          {tech !== null && (
            <div className='p-1'>
              {tech.firstName} {tech.lastName}
              <p>Tech ID# {tech._id}</p>
            </div>
          )}
          {logs !== null && (
            <FormControl fullWidth>
              <InputLabel id='edit-log' className='white-text'>
                Your Logs
              </InputLabel>
              <Select
                MenuProps={{ disablePortal: true }} //MUI BUG
                labelId='edit-log'
                id='edit-log'
                value={text}
                label='Log'
                className='white-text'
                onChange={selectOnChange}>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {logs.map(
                  (item) =>
                    tech._id === item.tech._id && (
                      <MenuItem className='' key={item._id} value={item._id}>
                        {item._id}
                      </MenuItem>
                    )
                )}
              </Select>
              <div className='row input-row'>
                <div className='input-field '>
                  Edit Message:
                  <textarea
                    className='grey input-field'
                    type='textarea'
                    name='msg'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='input-field'>
                  <p>
                    <label>
                      <input
                        type='checkbox'
                        className='filled-in'
                        checked={attention}
                        value={attention}
                        onChange={(e) => setAttention(!attention)}></input>
                      <span className='white-text'>Needs Attention</span>
                    </label>
                  </p>
                </div>
              </div>

              <div className='modal-footer grey darken'>
                <a
                  href='#!'
                  onClick={onSubmit}
                  className=' modal-close z-depth-3 hoverable modal-close  waves-effect blue btn  edit-submit-btn'>
                  Submit
                </a>
              </div>
            </FormControl>
          )}
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '100%',
  height: '100%'
};

EditTechLogModal.propTypes = {
  // current: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log,
  auth: state.auth
});

export default connect(mapStateToProps, { setCurrent, updateLog })(
  EditTechLogModal
);
