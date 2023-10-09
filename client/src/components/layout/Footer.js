// import React from 'react'

const Footer = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <section>
      <footer className=' white-text'>
        <p className='center'>IT Logger</p>
        <p className=' center'>copyright 2021-{currentYear}</p>
      </footer>
    </section>
  );
};
export default Footer;
