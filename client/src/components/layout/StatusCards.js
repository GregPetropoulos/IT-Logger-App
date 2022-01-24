import React, { Fragment, useState } from 'react';

const StatusCards = () => {
  // * STATE of 3 Servers
  // May need to add use effect later date
  const [serverState, setServerState] = useState({
    servers: [
      {
        switcher: true,
        name: 'Server 1',
        sid: 1,
        counter: 0,
        date: ''
      },
      {
        switcher: true,
        name: 'Server 2',
        sid: 2,
        counter: 0,
        date: ''
      },
      {
        switcher: true,
        name: 'Server 3',
        sid: 3,
        counter: 0,
        date: ''
      }
    ]
  });

  const { servers } = serverState;
  const onChange = (id) => {
    let updatedList = servers.map((item) =>
      item.sid === id
        ? {
            ...item,
            switcher: !item.switcher,
            date: new Date(),
            counter: item.counter + 1
          }
        : item
    );

    setServerState({ ...serverState, servers: updatedList });
  };
  console.log(serverState.servers);
  return (
    <Fragment>
      <div className=' row valign-wrapper'>
        {serverState.servers.map((arr) => (
          <div key={arr.sid} className='col s12 m5'>
            <div className=' z-depth-4 hoverable grey darken-4 center card'>
              <i
                className={
                  arr.switcher
                    ? 'light-green-text text-accent-3 center-align large material-icons'
                    : 'red-text center-align large material-icons'
                }>
                change_history
              </i>
              <p
                className={
                  arr.switcher ? 'light-green-text text-accent-3 ' : 'red-text'
                }>
                {arr.name}
              </p>
              <p
                className={
                  arr.switcher ? 'light-green-text text-accent-3 ' : 'red-text'
                }>
                {arr.switcher ? (
                  <span>
                    UP EVENT {arr.counter !== 0 ? 1 + arr.counter / 2 : 1}
                  </span>
                ) : (
                  <span>
                    DOWN EVENT {arr.counter && -Math.round(arr.counter / 2)}
                  </span>
                )}
              </p>
              <div className='switch center'>
                <label>
                  UP
                  <input
                    type='checkbox'
                    checked={arr.switcher}
                    name={arr.name}
                    onChange={() => onChange(arr.sid)}
                  />
                  <span className='lever'></span>
                  DOWN
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default StatusCards;
