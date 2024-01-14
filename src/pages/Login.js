import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import loginImg from '../assets/login.jpg';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/operaions/authAPI';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        username: '',
        password: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitContactForm = async (data) => {
    try {
      const { username, password } = data;
      dispatch(login(username, password, navigate));
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <div className='text-white flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900'>
      <div className='flex justify-center items-center gap-3 p-10 rounded-lg flex-wrap bg-gradient-to-r from-gray-700 to-gray-800'>
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className='flex-1 sm:w-96 text-slate-100 text-xl font-mono'
        >
          <div className='flex gap-1 flex-col mt-3'>
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
            {errors.username && <span className='text-red-500'>{errors.username.message}</span>}
          </div>

          <div className='flex gap-1 flex-col mt-3'>
            <label htmlFor='password' className='text-white'>
              Password
            </label>
            <input
              name='password'
              id='password'
              type='password' // Change to password type
              {...register('password', {
                required: 'Please Enter Password',
              })}
              className='text-black rounded-md py-2'
              placeholder='Password'
            />
            {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          </div>

          <Link to='/forgot-password'>
            <div className='text-blue-800 mt-3 text-lg'>Forgot Password?</div>
          </Link>

          <button className='rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-800 w-full hover:bg-lime-700 transition duration-300'>
            Login
          </button>
        </form>

        <div className=''>
          <img src={loginImg} className='w-[350px] sm:w-[450px]' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Login;
