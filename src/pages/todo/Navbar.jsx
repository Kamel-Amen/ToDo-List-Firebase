// import React from 'react'
import {
  faFaceSmile,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { name } = useGetUserInfo();
  const navigate = useNavigate();

  const signUserOut = async () => {
    try {
      await signOut(auth);
      toast.info('Logged out successfully !!');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className='navbar fixed-top bg-body-tertiary'>
      <div className='container-fluid'>
        <a className='navbar-brand fw-bold' href='#'>
          Welcome to your todo list{' '}
          <span className='text-primary fw-light text-decoration-underline'>
            {name}
          </span>{' '}
          <FontAwesomeIcon icon={faFaceSmile} className='text-primary' />
        </a>
        <button onClick={signUserOut} className='btn btn-primary'>
          Logout <FontAwesomeIcon icon={faRightToBracket} className='ms-1' />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
