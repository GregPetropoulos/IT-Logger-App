import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import TechLogItems from '../techlog/TechLogItems';
import Preloader from './Preloader';

const Dashboard = ({
  log: { logs, loading },
  auth: { isAuthenticated, tech }
}) => {
  if (isAuthenticated === false || tech === null || logs === null) {
    return <Preloader />;
  }

  //*DESTRUCTURE TECH FOR USE IN RETURN
  const { _id, firstName, lastName } = tech;

  //* FOR DASHBOARD DATE
  const todayDate = new Date();

  //* FOR ATTENTION COUNTER
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

          <ul className='collapsible btn-user-logs'>
            <li>
              <div className='center collapsible-header  grey darken-3 btn-user-logs'>
                <i className='material-icons'>message</i>
                Your Logs to Date {numberOfLogsOfTech}
              </div>
              <div className=' collapsible-body grey darken-3 collection '>
                {logs !== null &&
                  logs.map((logItem) => (
                    <TechLogItems key={logItem._id} logItem={logItem} />
                  ))}
              </div>
            </li>
          </ul>
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
