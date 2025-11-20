import React from 'react';
import reviewQuote from '../../../assets/reviewQuote.png';

const ReviewCard = ({ review }) => {
  return (
    <div className="p-8 shadow-md rounded-2xl bg-white border border-gray-200 max-w-sm">
      {/* Quote icon */}
      <img src={reviewQuote} alt="quote" className="w-8 mb-4 opacity-60" />

      {/* Review text */}
      <div className="border-b border-dashed pb-4 min-h-20">
        <p className="text-gray-700 leading-relaxed">{review.review}</p>
      </div>

      {/* Profile section */}
      <div className="flex mt-5 items-center gap-4">
        {/* Circle avatar like your sample */}
        <div className="">
          <img
            src={review.user_photoURL}
            alt=""
            className="w-12 h-12 rounded-full"
          />
        </div>

        <div>
          <h3 className="font-semibold text-teal-900">
            {review.userName || 'Unknown User'}
          </h3>
          <p className="text-sm text-gray-500">
            {review.user_email || 'Senior Product Designer'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
