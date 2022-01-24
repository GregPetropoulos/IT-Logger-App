import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';
import Preloader from '../layout/Preloader';
import { Footer } from '../layout/Footer';

const Techs = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  if (loading || techs === null) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <section style={{ height: '100vh' }}>
        <h2 className='center-align'>Meet The Techs</h2>
        <ul className='collection'>
          {techs.map((t) => (
            <li
              className='white-text collection-item grey darken-3'
              key={t._id}
              t={t}>
              Name: {t.firstName} {t.lastName}
              <div></div>
              Contact:{" "}
              <a href={`mailto:${t.email}`} alt='tech email'>
                {t.email}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </Fragment>
  );
};

Techs.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  tech: state.tech
});
export default connect(mapStateToProps, { getTechs })(Techs);
