import React, { useContext } from 'react';
import { CardContext } from '../context/CardProvider';

const ReviewComp = () => {
  const { reviewData } = useContext(CardContext);

  return (
    <div className="flex flex-col gap-6 items-center sm:w-[70rem]">
      {reviewData.map((review, index) => (
        <div
          key={index}
          className="flex flex-col w-[20rem] sm:w-full p-4 bg-white  rounded-lg"
        >
          {/* User Info */}
          <div className="flex flex-row items-center gap-4">
            <img
              src={review.imgUrl}
              alt={`${review.name}'s profile`}
              className="w-[3.5rem] h-[3.5rem] rounded-full bg-green-500"
            />
            <h1 className="text-[1.2rem] font-bold">{review.name}</h1>
          </div>

          {/* User Review */}
          <div className="mt-4">
            <p className="text-gray-700">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComp;
