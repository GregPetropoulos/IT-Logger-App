import { useState } from 'react';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import TechLogItems from '../techlog/TechLogItems';
import Preloader from './Preloader';
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';
import LogItem from '../logs/LogItem';
import PropTypes from 'prop-types';

const Dashboard = ({ log, auth }) => {
  const { logs, loading } = log;
  const { isAuthenticated, tech } = auth;
  const [showLogs, setShowLogs] = useState(false);
  if (isAuthenticated === false || tech === null || logs === null) {
    return <Preloader />;
  }

  const { _id, firstName, lastName } = tech;

  const todayDate = new Date();

  const numberOfAttentions = logs
    .map((log) => log.tech._id === _id && log.attention === true)
    .filter(Boolean).length;

  //* FOR LOG COUNTER PER TECH
  const numberOfLogsOfTech = logs
    .map((log) => log.tech._id === _id)
    .filter(Boolean).length;

  return (
    <>
      {isAuthenticated && _id && (
        <div className='card-panel blue z-depth-2 white-text borderRad10'>
          <span className='new badge red' data-badge-caption='Attentions'>
            {numberOfAttentions}
          </span>
          <p>Date {formatDate(todayDate)}</p>
          <h5 className='center'>
            Hi {firstName} {lastName}
          </h5>
          <h5>{numberOfLogsOfTech} Logs are active</h5>
          <Button
            variant='contained'
            startIcon={<MessageIcon />}
            onClick={() => setShowLogs(!showLogs)}>
            {' '}
            {!showLogs ? 'Show Your Logs' : 'Close Logs'}
          </Button>
          {showLogs &&
            logs.length > 0 &&
            logs.map((logItem) => {
              return <TechLogItems key={logItem._id} logItem={logItem} />;
            })}
        </div>
      )}
    </>
  );
};

const Logs = ({ log }) => {
  const { logs, loading, filtered } = log;
  if (loading || logs === null) {
    return <Preloader />;
  }

  if (logs.length === 0) {
    return <p className='center'>No Logs to Show...</p>;
  }

  return (
    <>
      <ul className='collection with-header borderRad10 white-text'>
        <li className='collection-header grey darken-3'>
          <h4 className='center white-text'>System Logs</h4>
        </li>
        {filtered !== null
          ? filtered.map((log) => <LogItem log={log} key={log._id} />)
          : logs.map((log) => <LogItem log={log} key={log._id} />)}
      </ul>
    </>
  );
};

const TechDashboard = ({ log, auth }) => {
  return (
    <>
      <div className='no-border col  m5 s12 dashboard'>
        <Dashboard log={log} auth={auth} />
      </div>
      <div className='no-border col  m7 s12 '>
        <Logs log={log} />
      </div>
    </>
  );
};
TechDashboard.propTypes={
    log:PropTypes.object,
    auth:PropTypes.object
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  log: state.log
});
export default connect(mapStateToProps, {})(TechDashboard);
