import { connect } from 'react-redux';
import LogFilter from './LogFilter';
import Hero from '../hero/Hero';
import AddTechLogModal from '../techlog/AddTechLogModal';
import EditTechLogModal from '../techlog/EditTechLogModal';
import DeleteTechLogModal from '../techlog/DeleteTechLogModal';
import AddBtn from './AddBtn';
import StatusCards from './StatusCards';
import Logs from '../logs/Logs';
import TechDashboard from './TechDashboard';
import PropTypes from 'prop-types';

const Home = ({ auth: { isAuthenticated } }) => {
  return (
    <>
      {isAuthenticated ? (
        <section className='row '>
          <Hero />
          <StatusCards />
          <LogFilter />
          <TechDashboard />
          <AddBtn />
          <AddTechLogModal />
          <EditTechLogModal />
          <DeleteTechLogModal />
        </section>
      ) : (
        <div className='container'>
          <Logs />
        </div>
      )}
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Home);
