import React from 'react';

const ServerSwitcher = ({ onChange, checked, name, value }) => {
  console.log('SERVERSWITCH value', value);
  console.log('checkedin ithe switcher', checked);

  return (
    <div className=' row valign-wrapper'>
      <div className='col s12 m5'>
        <div className=' z-depth-4 hoverable grey darken-4 center card'>
          <i
            className={
              checked
                ? 'light-green-text text-accent-3 center-align large material-icons'
                : 'red-text center-align large material-icons'
            }>
            change_history
          </i>
          <p
            className={
              checked ? 'light-green-text text-accent-3 ' : 'red-text'
            }>
            {name}
          </p>
          <p
            className={
              checked ? 'light-green-text text-accent-3 ' : 'red-text'
            }>
            {checked ? <span>UP</span> : <span>DOWN</span>}
          </p>
          <div className='switch center'>
            <label>
              UP
              <input
                type='checkbox'
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
              />
              <span className='lever'></span>
              DOWN
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSwitcher;
