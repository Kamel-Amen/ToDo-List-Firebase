// import React from 'react';
import './auth.css';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { serverTimestamp } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReturnBtn from '../../components/ReturnBtn';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(userAuth);
      const authUserInfo = {
        userId: userAuth.user.uid,
        name: userAuth.user.email,
        createdAt: serverTimestamp(),
        isAuth: true,
        userAccountType: 'email',
      };
      toast.success('Successful login !');
      localStorage.setItem('auth', JSON.stringify(authUserInfo));
      navigate('/todo');
    } catch (err) {
      console.error(err);
      toast.error('ERROR, Login again later !');
    }
  };

  return (
    <div className='login d-flex justify-content-center align-items-center text-white'>
      <ReturnBtn />

      <form
        onSubmit={handleSubmit}
        className='login-form d-flex flex-column fs-4'
      >
        <label htmlFor='email' data-aos='fade-right'>
          Email *
        </label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='example@email.com'
          onChange={(e) => setEmail(e.target.value)}
          className='mb-4 p-2 fs-5'
          data-aos='fade-right'
          data-aos-duration='1000'
          data-aos-delay='100'
          required
        />

        <label htmlFor='password' data-aos='fade-right' data-aos-delay='100'>
          Password *
        </label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='at least 6 characters'
          onChange={(e) => setPassword(e.target.value)}
          className='mb-4 p-2 fs-5'
          data-aos='fade-right'
          data-aos-duration='1000'
          data-aos-delay='200'
          required
        />

        <button
          type='submit'
          className='submit-btn btn btn-primary fs-5'
          data-aos='flip-down'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
