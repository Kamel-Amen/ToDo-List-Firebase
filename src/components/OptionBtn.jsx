/* eslint-disable react/prop-types */
// import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const OptionBtn = ({ destination, icon, title }) => {
  return (
    <NavLink
      to={destination}
      className='option bg-light d-flex justify-content-center align-items-center text-decoration-none rounded-3 px-3 mb-5'
    >
      {title} <FontAwesomeIcon icon={icon} className='ms-3' />
    </NavLink>
  );
};

export default OptionBtn;
