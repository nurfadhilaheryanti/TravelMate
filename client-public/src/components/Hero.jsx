import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import gearLoad from "../components/assets/Ripple@1x-1.0s-200px-200px.svg";

const Hero = () => {
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {

      // Navigate to CustomizeTrip with recommendation ID and destination as params
      navigate(`/customize`, {
        state: { destination },
      });

    } catch (error) {
      console.error("Error handling search:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <img src={gearLoad} alt="Loading..." className="w-20 h-20" />
        </div>
      )}
      <div className={`bg-black/20 h-full ${loading ? "opacity-50" : ""}`}>
        <div className="h-full flex justify-center items-center p-4 bg-primary/10">
          <div className="container grid grid-cols-1 gap-4">
            <div className="text-white text-center">
              <p data-aos="fade-up" data-aos-delay="300" className="font-bold text-3xl">
                Search Your Destination
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="600" className="bg-white rounded-md p-4 relative text-center">
              <div className="mb-3"> {/* Centering container */}
                <label htmlFor="destination" className="opacity-70 block">
                  Search your Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  placeholder="Bangkok"
                  className="w-full bg-gray-100 range accent-primary focus:outline-primary focus:outline outline-1 rounded-full p-2"
                  value={destination}
                  onChange={handleDestinationChange}
                />
              </div>
              <div className="text-center"> {/* Centering container */}
                <button
                  className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-4 py-2 rounded-full duration-200 inline-block"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  Search Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
