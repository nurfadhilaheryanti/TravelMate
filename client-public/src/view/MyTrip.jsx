import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyTrip = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/tripList`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/tripList/${tripId}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      // After deletion, refetch the trip list
      await fetchTrip();
    } catch (error) {
      console.error('Error deleting trip:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Trip</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-bold mb-2">{trip.tripName}</h2>
              {/* {console.log( JSON.parse(trip.locations), '<<<<')} */}
              <p className="text-gray-600 mb-4">{JSON.parse(trip.locations).length} locations</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDeleteTrip(trip.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full transition duration-300 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => console.log('View trip:', trip.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
                >
                  View Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrip;
