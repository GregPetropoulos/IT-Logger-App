import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import TechLogItems from '../techlog/TechLogItems';
import Preloader from './Preloader';
import Button from '@mui/material/Button';
import MessageIcon from '@mui/icons-material/Message';

const Dashboard = ({
  log: { logs, loading },
  auth: { isAuthenticated, tech }
}) => {
  const [showLogs, setShowLogs] = useState(false);
  if (isAuthenticated === false || tech === null || logs === null) {
    return <Preloader />;
  }
  const { _id, firstName, lastName } = tech;

  //* FOR DASHBOARD DATE
  const todayDate = new Date();

  const numberOfAttentions = logs
    .map((log) => log.tech._id === _id && log.attention === true)
    .filter(Boolean).length;

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
            {!showLogs ? 'Show Logs' : 'Close Logs'}
          </Button>
          {showLogs && logs.length > 0 ? (
            <ul className='collapsible'>
              <li>
                <div className=' collapsible-body grey darken-3 collection '>
                  {logs.length > 0 &&
                    logs.map((logItem) => {
                      return (
                        <TechLogItems key={logItem._id} logItem={logItem} />
                      );
                    })}
                </div>
              </li>
            </ul>
          ) : null}
        </div>
      )}
    </>
  );
};

Dashboard.propTypes = {
  log: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  log: state.log
});

export default connect(mapStateToProps, {})(Dashboard);
