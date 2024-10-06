// import React from 'react';
import './auth.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { serverTimestamp } from 'firebase/database';
import ReturnBtn from '../../components/ReturnBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Input from '../../components/Input';
import googleIcon from '../../assets/google-brands-solid.svg';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* Auth history */
  const { isAuth } = useGetUserInfo();
  if (isAuth) {
    return <Navigate to='/todo' />;
  }

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please provide email and password!');
      return;
    }

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
      };
      toast.success('Successful Login With Email !');
      localStorage.setItem('auth', JSON.stringify(authUserInfo));
      navigate('/todo');
    } catch (err) {
      console.error(err);
      toast.error('ERROR, Login again later !');
    }
  };

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, googleProvider);
      const userAuthInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        createdAt: serverTimestamp(),
        isAuth: true,
      };
      localStorage.setItem('auth', JSON.stringify(userAuthInfo));
      toast.success('Successful Register With Google Account !');
      navigate('/todo');
    } catch (err) {
      console.error(err);
      toast.error('ERROR, Register again later !');
    }
  };

  return (
    <div className='register d-flex justify-content-center align-items-center text-white'>
      <ReturnBtn />

      <section className='register-sec w-100 d-flex flex-column align-items-center'>
        <p className='text-center fs-1 w-25 py-2'>
          Sign Up Here <FontAwesomeIcon icon={faUserPlus} />
        </p>

        <form
          onSubmit={handleSignUpWithEmail}
          className='login-form d-flex flex-column fs-4'
        >
          <label className='fs-4' htmlFor='email' data-aos='fade-right'>
            Email <span className='text-danger'>*</span>
          </label>
          <Input
            inputType='email'
            placeholder='example@email.com'
            styles='mb-4 p-2 fs-5'
            aos='fade-right'
            duration='1000'
            delay='100'
            handleChange={(e) => setEmail(e.target.value)}
          />

          <label
            className='fs-4'
            htmlFor='password'
            data-aos='fade-right'
            data-aos-delay='100'
          >
            Password <span className='text-danger'>*</span>
          </label>
          <Input
            inputType='password'
            placeholder='at least 6 characters'
            styles='mb-4 p-2 fs-5'
            aos='fade-right'
            duration='1000'
            delay='200'
            handleChange={(e) => setPassword(e.target.value)}
          />

          <button
            type='submit'
            className='submit-btn btn btn-danger fs-5'
            data-aos='flip-down'
          >
            Register
          </button>
        </form>

        <button
          className='btn btn-lg btn-primary scale-animation fs-5 mt-5'
          onClick={signInWithGoogle}
        >
          Sign Up With Google{' '}
          <img
            src={googleIcon}
            width={30}
            height={30}
            alt='google'
            className='border p-1 bg-white rounded-circle'
          />
        </button>
      </section>
    </div>
  );
};

export default Register;
