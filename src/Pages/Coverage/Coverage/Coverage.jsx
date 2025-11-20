import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenter = useLoaderData()
  // console.log(serviceCenter)
  const mapRef = useRef(null)

  const handleSearch = (e) => { 
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find(c => c.district.toLowerCase().includes(location.toLowerCase()))
    if(district){
      const coord = [district.latitude, district.longitude];
      console.log(district,coord)
      mapRef.current.flyTo(coord, 15)
    }


  }
  return (
    <div className="my-25">
      <h2 className="text-5xl font-bold my-10">
        We are available in 64 districts
      </h2>
      <form onSubmit={handleSearch} className="my-5 flex">
        <label
          className="input rounded-l-2xl border border-[#c9eb65] 
               focus-within:border-transparent focus-within:shadow-none"
        >
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            type="search"
            required
            name="location"
            placeholder="Search"
            className="focus:outline-none focus:border-none focus:ring-0"
          />
        </label>

        <button className="btn rounded-r-3xl -ms-2 border-l-0 bg-[#c9eb65]">
          Search
        </button>
      </form>

      <div className="shadow-md h-[500px] rounded-2xl overflow-hidden ">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          className="h-[500px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenter.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br /> Service Area:{' '}
                {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;