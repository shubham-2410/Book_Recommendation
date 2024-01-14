import React from 'react';
import {useNavigate} from 'react-router-dom'

const Home = () => {
  
  const navigate = useNavigate()
  return (
    <div className='bg-gradient-to-r from-blue-500 to-purple-500  flex flex-col justify-center items-center overflow-x-hidden py-10'>
      <div className='text-center mx-auto max-w-l'>
        <h1 className='text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white'>
          YourBookHub
        </h1>
        <p className='text-xl text-gray-200 mb-8'>
          Discover your next favorite book with AI-generated recommendations!
        </p>
        <p className='text-xl text-gray-200 mb-2'>
          Available with a library of 500+ books
        </p>
        <p className='text-xl text-gray-200 mb-8'>
          Explore genres like Sci-Fi, Romance, Mystery, and Thriller.
        </p>
        <button onClick={()=>navigate('/login')} className='bg-white text-blue-500 hover:bg-blue-400 px-6 py-3 rounded-full font-bold text-lg transition duration-300'>
          Get Started
        </button>
      </div>
      <div className='mt-10'>
        <img
          src='https://source.unsplash.com/random?books?500x300'
          alt='Book Recommendations'
          className='rounded-lg shadow-lg max-w-ful h-auto'
        />
      </div>
    </div>
  );
};

export default Home;
