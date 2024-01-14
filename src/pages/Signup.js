import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/sign.png';
import { signUp } from '../services/operaions/authAPI';

import { FaRegEye  , FaRegEyeSlash} from "react-icons/fa";

const Signup = () => {

    const [passIcon , setPassIcon] = useState(false);
    const [confPassIcon , setConfPassIcon] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitContactForm = async (data) => {
    const { email, username, password, confirmPassword } = data;
    try {
      dispatch(signUp(email, username, password, confirmPassword, navigate));
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <div className='text-white flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900'>
      <div className='flex justify-center items-center gap-3  p-10 rounded-lg flex-wrap bg-gradient-to-r from-gray-700 to-gray-800'>
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className='flex-1 sm:w-96 text-slate-100 text-xl font-mono'
        >
          <div className='flex gap-1 flex-col pt-3'>
            <label htmlFor='username' className='text-white'>
              User Name
            </label>
            <input
              name='username'
              id='username'
              type='text'
              {...register('username', {
                required: 'Please Enter User Name',
              })}
              className='text-black rounded-md py-2'
              placeholder='User Name'
            />
            {errors.username && (
              <span className='text-red-500'>{errors.username.message}</span>
            )}
          </div>

          <div className='flex gap-1 flex-col pt-3'>
            <label htmlFor='email' className='text-white'>
              Email
            </label>
            <input
              name='email'
              id='email'
              type='email'
              {...register('email', {
                required: 'Please Enter Email ID',
              })}
              className='text-black rounded-md py-2'
              placeholder='Email Id'
            />
            {errors.email && (
              <span className='text-red-500'>{errors.email.message}</span>
            )}
          </div>

          <div className='flex gap-1 flex-col pt-3'>
            <label htmlFor='password' className='text-white'>
              Password
            </label>
            <input
              name='password'
              id='password'
              type={`${passIcon===false ? 'password' :'text'}`} 
              {...register('password', {
                required: 'Please Enter Password',
              })}
              className='text-black rounded-md py-2'
              placeholder='Password'
            />
            <span onClick={()=>setPassIcon(!passIcon)}>
                { 
                    !passIcon ? <FaRegEyeSlash/> : <FaRegEye/>
                }
            </span>
            {errors.password && (
              <span className='text-red-500'>{errors.password.message}</span>
            )}
          </div>

          <div className='flex gap-1 flex-col pt-3'>
            <label htmlFor='confirmPassword' className='text-white'>
              Confirm Password
            </label>
            <input
              name='confirmPassword'
              id='confirmPassword'
              type={`${confPassIcon===false ? 'password' :'text'}`} 
              {...register('confirmPassword', {
                required: 'Please Confirm Password',
              })}
              className='text-black rounded-md py-2  '
              placeholder='Confirm Password'
            />
            <span onClick={()=>setConfPassIcon(!confPassIcon)}
            >
                { 
                    !confPassIcon ? <FaRegEyeSlash/> : <FaRegEye/>
                }
            </span>
            {errors.confirmPassword && (
              <span className=' text-red-500'>{errors.confirmPassword.message}</span>
            )}
          </div>

          <button className='rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-full hover:bg-lime-700 transition duration-300'>
            SignUp
          </button>
        </form>

        <div>
          <img src={loginImg} className='w-[350px] sm:w-[450px]' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Signup;
