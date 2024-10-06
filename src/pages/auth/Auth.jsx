// import React from 'react'
import './auth.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import OptionBtn from '../../components/OptionBtn';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const { isAuth } = useGetUserInfo();

  if (isAuth) {
    return <Navigate to='/todo' />;
  }

  return (
    <div className='auth d-flex justify-content-center align-items-center'>
      <section className='options d-flex align-items-center w-100 flex-column'>
        <OptionBtn destination='/register' icon={faUserPlus} title='Register' />
        <OptionBtn
          destination='/login'
          icon={faRightFromBracket}
          title='Login'
        />
      </section>
    </div>
  );
};

export default Auth;
