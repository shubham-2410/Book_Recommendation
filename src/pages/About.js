import React from 'react';

const About = () => {
  return (
    <div className='text-gray-800 font-extrabold flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-blue-900'>
      <h1 className='text-4xl md:text-6xl lg:text-7xl mb-4 text-white text-center pb-10'>About Us</h1>
      <div className='flex flex-col md:flex-row items-center justify-center md:justify-evenly'>
        <img
          src='https://source.unsplash.com/random?books'
          alt='Team Photo'
          className='rounded-lg shadow-lg mb-4 md:mb-0 max-w-full h-auto md:h-[350px]'
        />
        <div className='md:w-1/2 text-white md:ml-8 p-2'>
          <p className='text-lg md:text-xl lg:text-2xl mb-4'>
            Welcome to Your Book Hub, where we're passionate about helping you discover your next favorite book!
          </p>
          <p className='text-lg md:text-xl lg:text-2xl mb-4'>
            We are a dedicated team of book enthusiasts committed to providing you with personalized book recommendations.
          </p>
          <p className='text-lg md:text-xl lg:text-2xl mb-4'>
            Our mission is to make your reading journey enjoyable by connecting you with books that match your interests.
          </p>
          <p className='text-lg md:text-xl lg:text-2xl'>
            Feel free to explore our platform and discover a world of literary delights!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
