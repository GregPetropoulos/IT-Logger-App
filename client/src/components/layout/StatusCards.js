import React, { useState } from 'react';

const StatusCards = () => {
  // FAKE DB
  const server = [
    { name: 'Server 1', id: 1, status: true, counter: 0 },
    { name: 'Server 2', id: 2, status: true, counter: 0 },
    { name: 'Server 3', id: 3, status: true, counter: 0 }
  ];

  // STATE of 3 false values to start
  const [checked, setChecked] = useState(new Array(server.length).fill(false));
  //    const [serverStatus, setServerStatus]=useState(true)
  //    need to set checkbox up
  //  need to set up back end db, editmodal,  and redux for server

  const onChange = (position) => {
    const checked = setChecked.map((item, key) =>
      key === position ? !item : item
    );
  };
  return (
    <div className=' row valign-wrapper'>
      {server.map((arr, index) => (
        <div key={arr.id} className='col s12 m5'>
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
              {arr.name}
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
                  id={`arr.id-${index}`}
                  name={arr.name}
                  value={arr.name}
                  checked={checked[index]}
                  onChange={(e) => setChecked(index)}
                />
                <span className='lever'></span>
                DOWN
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
