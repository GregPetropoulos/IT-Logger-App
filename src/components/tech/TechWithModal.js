import React, { useState, useEffect } from 'react';
import TechItem from './TechItem';

const TechWithModal = () => {
  // Local state, later move to redux
  const [techs, setTechs] = useState([]);

  // Local state, later move to redux
  const [loading, setLoading] = useState(false);

  // Calling the getTechs fetch in the useEffect
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setLoading(true);
    const res = await fetch('/techs');
    // unlike axios will need to format data
    const data = await res.json();

    setTechs(data);
    setLoading(false);
  };

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {!loading &&
            techs.map((tech) => <TechItem key={tech.id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

export default TechWithModal;
