// import React from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { serverTimestamp } from 'firebase/database';
import ReturnBtn from '../../components/ReturnBtn';

const Register = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, googleProvider);
      const userAuthInfo = {
        userId: results.user.uid,
        name: results.user.displayName,
        createdAt: serverTimestamp(),
        isAuth: true,
        userAccountType: 'google',
      };
      localStorage.setItem('auth', JSON.stringify(userAuthInfo));
      toast.success('Successful Register !');
      navigate('/todo');
    } catch (err) {
      console.error(err);
      toast.error('ERROR, Register again later !');
    }
  };

  return (
    <div className='register d-flex justify-content-center align-items-center text-white'>
      <ReturnBtn />

      <section className='w-100 d-flex flex-column align-items-center'>
        <p className='text-center'>Register With Google to Continue !!</p>
        <button
          className='btn btn-lg btn-danger scale-animation'
          onClick={signInWithGoogle}
        >
          Sign In With Google
        </button>
      </section>
    </div>
  );
};

export default Register;
