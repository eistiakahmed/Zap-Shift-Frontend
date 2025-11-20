import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

const FAQSection = () => {
  return (
    <div className="max-w-3xl mx-auto py-14 px-4">
      {/* Heading */}
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-3">
        Frequently Asked Question (FAQ)
      </h2>

      {/* Subheading */}
      <p className="text-center text-gray-500 max-w-2xl mx-auto mb-10">
        Enhance posture, mobility, and well-being effortlessly with Posture Pro.
        Achieve proper alignment, reduce pain, and strengthen your body with
        ease!
      </p>

      <div className="flex flex-col gap-3">
        {/* Open FAQ */}
        <div className="collapse collapse-arrow rounded-lg bg-[#e8ffff]">
          <input type="radio" name="faq"  />
          <div className="collapse-title text-lg font-semibold text-[#03373d]">
            How does this posture corrector work?
          </div>
          <div className="collapse-content text-gray-600 leading-relaxed border-t">
            <p>
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </p>
          </div>
        </div>

        
        <div className="collapse collapse-arrow bg-white rounded-lg shadow-md ">
          <input type="radio" name="faq" />
          <div className="collapse-title text-base font-medium">
            Is it suitable for all ages and body types?
          </div>
          <div className="collapse-content text-gray-600">
            <p>Yes, it's adjustable and fits most body types comfortably.</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white rounded-lg shadow-md ">
          <input type="radio" name="faq" />
          <div className="collapse-title text-base font-medium">
            Does it really help with back pain and posture improvement?
          </div>
          <div className="collapse-content text-gray-600">
            <p>Yes, consistent use significantly improves posture.</p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white rounded-lg shadow-md ">
          <input type="radio" name="faq" />
          <div className="collapse-title text-base font-medium">
            Does it have smart features like vibration alerts?
          </div>
          <div className="collapse-content text-gray-600">
            <p>
              Some models do include vibration alerts to notify bad posture.
            </p>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-white rounded-lg shadow-md ">
          <input type="radio" name="faq" />
          <div className="collapse-title text-base font-medium">
            How will I be notified when the product is back in stock?
          </div>
          <div className="collapse-content text-gray-600">
            <p>You will receive an email or SMS notification instantly.</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="text-center mt-10 flex justify-center items-center">
        <button className="btn bg-[#d2fb52] text-[#03373d] rounded-full px-8 py-3 border-none hover:brightness-95 flex items-center gap-2">
          See More FAQ’s
          <span className="bg-black text-white rounded-full p-1">
            <FiArrowUpRight size={18} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FAQSection;

