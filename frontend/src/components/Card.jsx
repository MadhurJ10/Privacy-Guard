import React, { useContext } from 'react';
import { CardContext } from '../context/CardProvider';

const Card = () => {
  const { CardItems } = useContext(CardContext);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {CardItems.map((item, index) => (
        <div
          key={index}
          className="w-[20rem] flex flex-col sm:w-[17rem] p-4 bg-white  rounded-2xl"
        >
          {/* Card Image */}
          <div
            className="w-full h-[15rem] bg-center bg-cover rounded-2xl"
            style={{
              backgroundImage: `url(${item.imgUrl})`,
            }}
          ></div>
          {/* Card Content */}
          <h1 className="mt-4 text-lg font-semibold">{item.heading}</h1>
          <p className="mt-2 text-sm text-gray-700">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
