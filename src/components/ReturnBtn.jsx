// import React from 'react'
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const ReturnBtn = () => {
  return (
    <NavLink
      className='btn btn-danger position-absolute bottom-0 start-0 m-3 scale-animation'
      to='/'
    >
      Return
      <FontAwesomeIcon icon={faRotateLeft} className='ms-2' />
    </NavLink>
  );
};

export default ReturnBtn;
