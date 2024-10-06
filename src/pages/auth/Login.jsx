// import React from 'react';
import './auth.css';
import ReturnBtn from '../../components/ReturnBtn';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { auth, googleProvider } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input';
import googleIcon from '../../assets/google-brands-solid.svg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* Auth history */
  const { isAuth } = useGetUserInfo();
  if (isAuth) {
    return <Navigate to='/todo' />;
  }

  const handleSignInWithEmail = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please provide email and password for login!');
      return;
    }

    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
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
      toast.error(
        'The account may be disabled, deleted, banned, or suspended, Please register new one !'
      );
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
      toast.success('Successful Login With Google Account !');
      navigate('/todo');
    } catch (err) {
      console.error(err);
      toast.error(
        'The account may be disabled, deleted, banned, or suspended, Please register new one !'
      );
    }
  };

  return (
    <div className='login d-flex justify-content-center align-items-center text-white'>
      <ReturnBtn />

      <section className='login-sec w-100 d-flex flex-column align-items-center'>
        <p className='text-center rounded-3 fs-1 w-25 py-2'>
          Sign In Here <FontAwesomeIcon icon={faRightToBracket} />
        </p>

        <form
          onSubmit={handleSignInWithEmail}
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
            className='submit-btn btn btn-primary fs-5'
            data-aos='flip-down'
          >
            Login
          </button>
        </form>

        <button
          className='btn btn-lg btn-danger scale-animation fs-5 mt-5'
          onClick={signInWithGoogle}
        >
          Login With Google{' '}
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

export default Login;
