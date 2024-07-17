import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GoogleMap = () => {
  const mapRef = useRef(null);
  const { recommendations: locations } = useSelector(state => state.recommendation);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const markersMap = useRef({});
  const [savingTrip, setSavingTrip] = useState(false);   

  useEffect(() => {
    const loadScript = (url) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      return new Promise((resolve) => {
        script.onload = resolve;
      });
    };

    const calculateCenter = (locations) => {
      const latitudes = locations.map(loc => loc.coordinates.latitude);
      const longitudes = locations.map(loc => loc.coordinates.longitude);
      const avgLatitude = latitudes.reduce((sum, lat) => sum + lat, 0) / latitudes.length;
      const avgLongitude = longitudes.reduce((sum, lng) => sum + lng, 0) / longitudes.length;
      return { lat: avgLatitude, lng: avgLongitude };
    };

    const initMap = () => {
      const parsedLocations = locations.parsedData || [];
      const center = calculateCenter(parsedLocations);
      const mapOptions = {
        zoom: 13,
        center: center,
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);
      
      parsedLocations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: { lat: location.coordinates.latitude, lng: location.coordinates.longitude },
          map: map,
          title: location.name,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="text-lg font-bold">${location.name}</h3>
              <p>${location.description}</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setSelectedLocation(location);
        });

        markersMap.current[location.name] = marker;
      });
    };

    if (locations.parsedData && locations.parsedData.length > 0) {
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyAjClgw-fQRe0J2U4P_myhy4d_8mrlu3eQ&callback=initMap&loading=async`)
        .then(() => {
          window.initMap = initMap;
        });
    }
 
    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [locations]);

  const handleCardClick = (location) => {
    setSelectedLocation(location);
    const marker = markersMap.current[location.name];
    marker?.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => marker?.setAnimation(null), 1400);
  };

  const handleBooking = (location) => {
    const hotelName = encodeURIComponent(location.name);
    const startDate = '2024-06-15';
    const endDate = '2024-07-14';
    const bookingUrl = `https://www.booking.com/searchresults.en-gb.html?ss=${hotelName}&checkin=${startDate}&checkout=${endDate}`;
    console.log(bookingUrl);
    window.open(bookingUrl, '_blank');
  };

  const handleSaveTrip = async () => {
    try {
      setSavingTrip(true);
      // const {id} = localStorage.user_id
      await axios.post('http://localhost:3000/my-trips', {
        id: localStorage.user_id,
        tripName: locations.tripName,
        locations: locations.parsedData.map(loc => ({
          name: loc.name,
          description: loc.description,
          coordinates: loc.coordinates,
        })),
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`
      }
      });
      alert('Trip saved successfully!');
      setSavingTrip(false);
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip. Please try again later.');
      setSavingTrip(false);
    }
  };

  if (!locations.parsedData || locations.parsedData.length === 0) {
    return <div>No locations available</div>;
  }

  // function handleEdit(){
  //   const id = localStorage.user_id
  //   navigate(`/my-tr/${id}`)
  // }
  

  return (
    <div className="flex h-screen">
      {/* {JSON.stringify(locations)} */}
      <div className="w-80 overflow-y-auto p-4 border-r border-gray-200">
        <h1 className="text-xl font-bold mb-4">{locations.tripName}</h1>
        {locations.parsedData.map((location, index) => (
          <div
            key={index}
            className={`p-4 mb-4 border border-gray-200 rounded cursor-pointer transition duration-300 ${
              selectedLocation === location ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`}
            onClick={() => handleCardClick(location)}
          >
            <h4 className="font-bold">{location.name}</h4>
            <p>{location.description}</p>
            {index === 0 && (
              <button
                onClick={() => handleBooking(location)}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 mr-2"
              >
                Book on Booking.com
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSaveTrip}
            className={`bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full duration-200 ${savingTrip ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            disabled={savingTrip}
          >
            {savingTrip ? 'Saving...' : 'Save Trip'}
          </button>
        </div>
      </div>
      <div id="map" ref={mapRef} className="flex-grow relative" />
    </div>
  );
};

export default GoogleMap;