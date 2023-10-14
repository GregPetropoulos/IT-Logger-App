import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Logs from '../logs/Logs';
import LogFilter from './LogFilter';
import Hero from '../hero/Hero';
import AddTechLogModal from '../techlog/AddTechLogModal';
import EditTechLogModal from '../techlog/EditTechLogModal';
import DeleteTechLogModal from '../techlog/DeleteTechLogModal';
import AddBtn from './AddBtn';
import Preloader from './Preloader';
import StatusCards from './StatusCards';
import Dashboard from './Dashboard';

const Home = ({ log: { logs }, auth: { isAuthenticated } }) => {
  // console.log('HOME COMPONENT');
  if (logs === null) {
    return <Preloader />;
  }
  return (
    <>
      {isAuthenticated ? (
        <section className='row '>
          <Hero />
          <StatusCards />
          <LogFilter />
          <div className='no-border col  m5 s12 dashboard'>
            <Dashboard />
          </div>
          <div className='no-border col  m7 s12 '>
            <Logs />
          </div>
          <AddBtn />
          <AddTechLogModal />
          <EditTechLogModal />
          <DeleteTechLogModal />
        </section>
      ) : (
        <Preloader />
      )}
    </>
  );
};

Home.propTypes = {
  log: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  log: state.log,
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
