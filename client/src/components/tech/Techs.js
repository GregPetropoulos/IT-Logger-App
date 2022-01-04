import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';
import Preloader from '../layout/Preloader';

const Techs = ({ tech: { techs, loading }, getTechs }) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  if (loading || techs === null) {
    return <Preloader />;
  }
  return (
    <section className='container'>
      <h2 className='center-align'>Meet The Techs</h2>
      {techs.map((t) => (
        <div className='collection' key={t._id} t={t}>
          <div className='collection-item'>
            Name: {t.firstName} {t.lastName}{' '}
            <div>
              Contact:{' '}
              <a href={`mailto:${t.email}`} alt='tech email'>
                {t.email}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

Techs.propTypes = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  tech: state.tech
});
// export default Techs
export default connect(mapStateToProps, { getTechs })(Techs);
