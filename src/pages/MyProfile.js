import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import profile from '../assets/profile.jpeg';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../services/operaions/authAPI';

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        genre: '',
        author: '',
      });
    }
  }, [reset, isSubmitSuccessful]);

  const dispatch = useDispatch();

  const updateProfileData = async (data) => {
    try {
      const { genre, author } = data;
      const favourite_genre = genre;
      const favourite_author = author;
      const userId = user.id;

      dispatch(updateProfile(favourite_genre, favourite_author, userId, navigate));
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <div className='w-full flex justify-center items-center p-5 flex-wrap bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900'>
      {/* Profile Card */}
      <div className='w-full sm:max-w-[400px] md:w-2/3 border-4 border-black flex flex-col justify-center items-center m-5 p-5 gap-10 rounded-xl pb-3 bg-gradient-to-r from-purple-800 to-indigo-800'>
        <img src={profile} alt='profile' className='w-[100px] h-[100px] rounded-full' />
        <div className='flex flex-col gap-3 font-semibold text-white text-center'>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Favourite Genre: {user?.favourite_genre}</p>
          <p>Favourite Author: {user?.favourite_author}</p>
        </div>

        {/* Edit Profile Button */}
        <button
          className='font-serif m-2 bg-blue-400 p-4 rounded-xl font-semibold text-white hover:bg-blue-500 transition duration-300'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Form */}
      {isVisible && (
        <div className='w-full sm:max-w-[400px] md:w-2/3 flex justify-center items-center gap-3 border-2 border-green-400 p-5 rounded-lg flex-wrap bg-gradient-to-r from-gray-700 to-gray-800'>
          <form
            onSubmit={handleSubmit(updateProfileData)}
            className='flex-1 sm:w-96 text-white text-xl font-mono'
          >
            {/* Genre Input */}
            <div className='flex gap-1 flex-col mt-3'>
              <label htmlFor='genre' className='text-white'>Genre</label>
              <input
                name='genre'
                id='genre'
                type='text'
                {...register('genre')}
                className='text-black rounded-md py-2'
                placeholder='Enter your favorite genre'
              />
              {errors.genre && <span className='text-red-500'>{errors.genre.message}</span>}
            </div>

            {/* Author Input */}
            <div className='flex gap-1 flex-col mt-3'>
              <label htmlFor='author' className='text-white'>Author</label>
              <input
                name='author'
                id='author'
                type='text'
                {...register('author')}
                className='text-black rounded-md py-2'
                placeholder='Enter your favorite author'
              />
              {errors.author && <span className='text-red-500'>{errors.author.message}</span>}
            </div>

            {/* Update Button */}
            <button className='rounded-md py-3 mt-5 text-center px-6 text-[16px] font-bold bg-lime-600 w-full hover:bg-lime-700 transition duration-300'>
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
