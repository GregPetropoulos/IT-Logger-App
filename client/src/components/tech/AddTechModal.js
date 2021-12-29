// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { addTech } from '../../actions/techActions';

// import M from 'materialize-css/dist/js/materialize.min.js';

// const AddTechModal = ({ addTech }) => {
//   // local state for form
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');

//   const onSubmit = (e) => {
//     e.preventDefault();
//     if (firstName === '' || lastName === '') {
//       M.toast({ html: 'Please enter a the first and last name' });
//     } else {
//       //*Pass in local state values to action for app level state on submit will add the tech to the server
//       addTech({
//         firstName,
//         lastName
//       });
//       M.toast({ html:  `${firstName} ${lastName} was added as a tech` });
//       // Clear fields
//       setFirstName('');
//       setLastName('');
//     }
//   };

//   return (
//     <div id='add-tech-modal' className='modal'>
//       <div className='modal-content'>
//         <h4>New Technician</h4>
//         <div className='row'>
//           <div className='input-field'>
//             <input
//               type='text'
//               name='firstName'
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//             <label htmlFor='firstName' className='active'>
//               First Name
//             </label>
//           </div>
//         </div>
//         <div className='row'>
//           <div className='input-field'>
//             <input
//               type='text'
//               name='lastName'
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//             <label htmlFor='lastName' className='active'>
//               Last Name
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className='modal-footer'>
//         <a
//           href='#!'
//           onClick={onSubmit}
//           className='modal-close waves-effect blue btn'>
//           Enter
//         </a>
//       </div>
//     </div>
//   );
// };
// AddTechModal.propTypes = {
//   addTech: PropTypes.func.isRequired
// };

// export default connect(null, { addTech })(AddTechModal);
