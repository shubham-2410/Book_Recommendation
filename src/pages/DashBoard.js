import React, { useEffect } from 'react';
import Card from '../components/Card';
import { allBooks, recommend } from '../services/operaions/bookAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const DashBoard = () => {
  const { recommendations } = useSelector((state) => state.aiRecommendations);
  const { myBooks } = useSelector((state) => state.aiRecommendations);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(allBooks());
    } catch (error) {
      console.log("Errors for allBooks", error.message);
    }
  }, []);

  const handleRecommendation = async () => {
    try {
      dispatch(recommend(user.favourite_genre, user.favourite_author, navigate));
      // toast.success("Books Recommended successfully using OPEN AI");
    } catch (error) {
      console.log("Error for recommendations", error.message);
    }
  };

  return (
    <div className='flex flex-col gap-10 mt-5 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white p-8 rounded-xl'>
      <div className='border-2 border-white rounded-xl flex flex-col gap-3 p-4 items-center justify-center'>
        <h2 className='font-extrabold text-2xl'>AI-based Recommendations</h2>
        {recommendations.length === 0 ? (
          <button
            onClick={() => handleRecommendation()}
            className='bg-green-600 m-2 p-3 rounded-sm font-mono text-lg font-semibold'
          >
            Get Recommendations
          </button>
        ) : (
          <div className='flex gap-5 flex-wrap max-w-full items-center justify-center'>
            {recommendations.map((rec, index) => (
              <Card key={index} data={rec} />
            ))}
          </div>
        )}
      </div>

      <div className='border-2 border-white rounded-xl flex flex-col gap-3 p-4 items-center justify-center'>
        {myBooks.length === 0 ? (
          <div>
            <p className='font-extrabold text-xl' >Currently, we are out of books (No books present in the database)</p>
          </div>
        ) : (
          <div className='text-black flex flex-col gap-3 p-4 items-center justify-center'>
            <h2 className='font-extrabold text-2xl'>Books you can also read, Books from the database</h2>
            <div className='flex gap-5 flex-wrap max-w-full items-center justify-center'>
              {myBooks.map((rec, index) => (
                <Card key={index} data={rec} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
