import React from 'react';

const AboutUs = () => {
  return (
    <div className="my-20">
      <h1 className="text-[#03373D] font-extrabold text-[56px] mb-2">
        About Us
      </h1>
      <p>
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <div className="my-5">
        {/* name of each tab group should be unique */}
        <div className="tabs tabs-lift">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Story"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time. <br /> We
              started with.
            </p>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Mission"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p>
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Success"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p className="">
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
          </div>
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Team & Others"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <p className="">
              We started with a simple promise — to make parcel delivery fast,
              reliable, and stress-free. Over the years, our commitment to
              real-time tracking, efficient logistics, and customer-first
              service has made us a trusted partner for thousands. Whether it's
              a personal gift or a time-sensitive business delivery, we ensure
              it reaches its destination — on time, every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
