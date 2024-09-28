// import React from 'react'
import './auth.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/fontawesome-free-solid';
import OptionBtn from '../../components/OptionBtn';

const Auth = () => {
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
