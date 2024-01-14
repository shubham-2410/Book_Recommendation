import React from 'react';

const Card = ({ data }) => {
  return (
    <div className='min-w-[200px] font-medium border-2 border-gray-300 rounded-md flex flex-col gap-3 items-center justify-center bg-gray-400 p-3 text-gray-800 hover:shadow-lg hover:bg-gray-200 transition duration-300'>
      <p className='text-center'>{data.title}</p>
      <p className='text-center'>{data.genre}</p>
      <p className='text-center'>{data.author}</p>
    </div>
  );
};

export default Card;
