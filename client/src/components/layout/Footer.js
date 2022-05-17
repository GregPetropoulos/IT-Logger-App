// import React from 'react'

export const Footer = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <section className='indigo lighten-1'>
      <footer className='footer-copyright'>
        <div className='center-align'>
          IT Logger
          <p>copyright 2021-{currentYear}</p>
        </div>
      </footer>
    </section>
  );
};
