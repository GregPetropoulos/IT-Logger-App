import React, { useState, useEffect } from 'react';
import LogItems from './LogItems';
import Preloader from '../layout/Preloader';

const Logs = () => {
  // Local state, later move to redux
  const [logs, setLogs] = useState([]);

  // Local state, later move to redux
  const [loading, setLoading] = useState(false);

  // Calling the getlogs fetch in the useEffect
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);
    const res = await fetch('/logs');
    // unlike axios will need to format data
    const data = await res.json();

    setLogs(data);
    setLoading(false);
  };

  if (loading) {
    <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className='center'>No Logs to Show...</p>
      ) : (
        logs.map((log) => <LogItems log={log} key={log.id} />)
      )}
    </ul>
  );
};

export default Logs;
