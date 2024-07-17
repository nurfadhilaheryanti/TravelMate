import React from "react";
import PlaceCard from "./PlaceCard";


const PlacesData = [
  {
    "img": "https://i.pinimg.com/564x/98/51/0a/98510a0c6013f5913fac4b6d6c3aac12.jpg",
    "title": "Paris",
    "location": "France",
    "description": "Explore the romantic streets and iconic landmarks of Paris.",
    "type": "Romantic"
},
{
    "img": "https://i.pinimg.com/564x/2b/41/45/2b4145328a4b15d08d263a256d410783.jpg",
    "title": "Tokyo",
    "location": "Japan",
    "description": "Experience the bustling city life and rich culture of Tokyo.",
    "type": "Urban"
},
{
    "img": "https://i.pinimg.com/564x/57/06/6c/57066c3d3e73cd653586d5f2235e813a.jpg",
    "title": "Sydney",
    "location": "Australia",
    "description": "Discover the iconic Sydney Opera House and relax on the famous Bondi Beach.",
    "type": "Adventure"
},
{
    "img": "https://i.pinimg.com/564x/84/02/7f/84027fd0e4a38adbc1ffb3fd6c325e9c.jpg",
    "title": "Rome",
    "location": "Italy",
    "description": "Discover the ancient history and stunning architecture of Rome.",
    "type": "Historical"
},
{
    "img": "https://i.pinimg.com/564x/70/be/05/70be05a539aa54e32d0f5818567d3c59.jpg",
    "title": "Rio de Janeiro",
    "location": "Brazil",
    "description": "Experience the lively culture and beautiful beaches of Rio de Janeiro.",
    "type": "Cultural"
},
{
    "img": "https://i.pinimg.com/564x/6b/03/d9/6b03d92864d41bc1fceb0876834ddef0.jpg",
    "title": "Cape Town",
    "location": "South Africa",
    "description": "Enjoy the scenic landscapes and vibrant city life of Cape Town.",
    "type": "Scenic"
}

];

const Places = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Best Places to Visit
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
