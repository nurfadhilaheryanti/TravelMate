import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addRecommendation } from "../features/recommendationSlice";
import gearLoad from "../components/assets/Ripple@1x-1.0s-200px-200px.svg";

const CustomizeTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialDestination = location.state?.destination || "";

  const [tripName, setTripName] = useState(""); // New state for trip name
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [travelType, setTravelType] = useState("solo");
  const [preferences, setPreferences] = useState({
    goodFood: false,
    hiddenGems: false,
    culturalExperiences: false,
  });
  const [loading, setLoading] = useState(false);

  const handleTripNameChange = (e) => {
    setTripName(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(parseInt(e.target.value));
  };

  const handleTravelTypeChange = (e) => {
    setTravelType(e.target.value);
  };

  const handlePreferenceChange = (preference) => {
    setPreferences({
      ...preferences,
      [preference]: !preferences[preference],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/recommendations", {
        tripName, // Include trip name in the form data
        destination: initialDestination,
        startDate,
        endDate,
        maxPrice,
        travelType,
        preferences,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
      }
      });

      dispatch(addRecommendation(response.data));
      navigate('/blogs'); // Navigate to blogs page or wherever needed after submission
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    { loading ? (
      <div className="mt-32 flex justify-center items-center">
        <img src={gearLoad} alt="Loading..." />
      </div>
    ) : (
      <div className="container mx-auto mt-8 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center mt-20">Customize Your Trip</h2>
        <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="tripName" className="block text-sm font-medium text-gray-700 mb-1">
              Trip Name
            </label>
            <input
              type="text"
              id="tripName"
              name="tripName"
              value={tripName}
              onChange={handleTripNameChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
              placeholder="Enter trip name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price (IDR)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="travelType" className="block text-sm font-medium text-gray-700 mb-1">
              Traveling As
            </label>
            <select
              id="travelType"
              name="travelType"
              value={travelType}
              onChange={handleTravelTypeChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            >
              <option value="solo">Solo</option>
              <option value="friends">With Friends</option>
              <option value="family">With Family</option>
              <option value="partner">With Partner</option>
            </select>
          </div>
          <div className="mb-6">
            <p className="block text-sm font-medium text-gray-700 mb-2">Preferences</p>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={preferences.goodFood}
                  onChange={() => handlePreferenceChange("goodFood")}
                />
                <span className="ml-2 text-sm text-gray-600">Good Food</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={preferences.hiddenGems}
                  onChange={() => handlePreferenceChange("hiddenGems")}
                />
                <span className="ml-2 text-sm text-gray-600">Hidden Gems</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  checked={preferences.culturalExperiences}
                  onChange={() => handlePreferenceChange("culturalExperiences")}
                />
                <span className="ml-2 text-sm text-gray-600">Cultural Experiences</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-secondary text-white hover:scale-105 px-6 py-3 rounded-full duration-200 block mx-auto"
          >
            Save and Continue
          </button>
        </form>
      </div>
    )}
    </>
  );
};

export default CustomizeTrip;
