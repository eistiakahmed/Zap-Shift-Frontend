import React from 'react';
import Banner from './Banner/Banner';
import deliveryTrack from '../../assets/Delivery-Tracking.png';
import Brands from './Brands/Brands';
import Reviews from './Reviews/Reviews';
import Services from './services/services';
import liveTracking from '../../assets/live-tracking.png';
import safeDelivery from '../../assets/safe-delivery.png';
import locationMerchant from '../../assets/location-merchant.png';
import FAQSection from './FAQSection/FAQSection';

const reviewsPromise = fetch('/reviews.json').then((res) => res.json());
const servicesPromise = fetch('/services.json').then((res) => res.json());

const HomePage = () => {
  const works = [
    {
      image: deliveryTrack,
      title: 'Booking Pick & Drop',
      description:
        'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      image: deliveryTrack,
      title: 'Cash On Delivery',
      description:
        'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      image: deliveryTrack,
      title: 'Delivery Hub',
      description:
        'From personal packages to business shipments — we deliver on time, every time.',
    },
    {
      image: deliveryTrack,
      title: 'Booking SME & Corporate',
      description:
        'From personal packages to business shipments — we deliver on time, every time.',
    },
  ];
  // console.log(works)

  const extraSection = [
    {
      image: liveTracking,
      title: 'Live Parcel Tracking',
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      image: safeDelivery,
      title: '100% Safe Delivery',
      description:
        'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    },
    {
      image: safeDelivery,
      title: '24/7 Call Center Support',
      description:
        'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    },
  ];

  return (
    <div>
      {/* Banner */ }
      <div className="my-10">
        <Banner />
      </div>
      {/* how to work section */ }
      <div className="my-25">
        <h3 className="text-4xl font-bold text-[#03373D]">How it Works</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10 mt-4 mb-10">
          { works.map((work) => (
            <>
              <div className="bg-white p-8 rounded-2xl hover:scale-110 shadow-md transition-all duration-300">
                <img src={ work.image } alt="" />
                <h3 className="text-lg font-bold text-[#03373d] mt-1">
                  { work.title }
                </h3>
                <p className="text-gray-400 mt-2">{ work.description }</p>
              </div>
            </>
          )) }
        </div>
      </div>

      {/* Our Services */ }
      <div className="bg-[#03373d] text-white p-10 rounded-3xl my-20">
        <div className="my-10">
          <h1 className="font-bold text-4xl text-center mb-2">Our Services</h1>
          <p className="text-center">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to <br /> business shipments —
            we deliver on time, every time.
          </p>
        </div>
        <div className="my-10">
          <Services servicesPromise={ servicesPromise } />
        </div>
      </div>
      {/* Brand */ }
      <div className="border-b border-dashed pb-3 border-[#03373D]">
        <h3 className="text-4xl font-bold text-center text-[#03373D]">
          We've helped thousands of sales teams
        </h3>
        <div className="my-8">
          <Brands />
        </div>
      </div>

      {/* Extra Section */ }
      <div className="my-20 border-dashed border-b  border-[#03373D] pb-5">
        { extraSection.map((extra) => (
          <>
            <div className="flex items-center bg-white gap-15 mb-4 p-4 rounded-3xl hover:scale-105 transition-all duration-300">
              <div className="border-r border-dashed pr-5 border-[#03373D]">
                <img src={ extra.image } alt="" />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold text-[#03373D]">
                  { extra.title }
                </h2>
                <p className="text-gray-800 font-medium">{ extra.description }</p>
              </div>
            </div>
          </>
        )) }
      </div>

      {/* Merchant and Customer Satisfaction is Our First Priority */ }

      <div
        className="bg-[#03373d] rounded-3xl h-[300px] md:h-[340px] w-full 
     bg-[url('/be-a-merchant-bg.png')]  bg-no-repeat  px-10 md:px-14 flex items-center"
      >
        {/* Left section */ }
        <div className="flex flex-col gap-4 max-w-lg text-white">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug">
            Merchant and Customer Satisfaction <br /> is Our First Priority
          </h2>

          <p className="text-gray-200 text-sm leading-relaxed">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          {/* Buttons */ }
          <div className="flex gap-4 mt-2">
            <button className="btn shadow-none bg-[#d2fb52] text-[#03373d] font-semibold rounded-full px-6 py-2 border-none  hover:scale-105 transition-all duration-200">
              Become a Merchant
            </button>

            <button className="btn bg-transparent shadow-none border border-[#d2fb52] text-[#d2fb52] rounded-full px-6 py-2 hover:scale-105 transition-all duration-200">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        {/* Right image */ }
        <div className="hidden md:flex flex-1 justify-end">
          <img
            src={ locationMerchant }
            alt="courier illustration"
            className=" object-contain drop-shadow-xl"
          />
        </div>
      </div>

      {/* Review */ }
      <div className="my-20">
        <Reviews reviewsPromise={ reviewsPromise } />
      </div>

      <div className="my-25">
        <FAQSection />
      </div>
    </div>
  );
};

export default HomePage;
