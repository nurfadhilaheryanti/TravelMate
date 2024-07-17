import React from "react";
import Hero from "../components/Hero";
import NatureVid from "../components/assets/video/main.mp4";
import BlogsComp from "../components/BlogComp";
import Places from "../components/Places";
// import Testimonial from "../components/Testimonial";
import Banner from "../components/banner";
import BannerPic from "../components/bannerPic";
import BannerImg from "../components/assets/cover-women.jpg";
import Banner2 from "../components/assets/travel-cover2.jpg";
// import OrderPopup from "../components/OrderPopup";

const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
      <div>
        <div className="h-[700px] relative">
          <video
            autoPlay
            loop
            muted
            className="absolute right-0 top-0 h-[700px] w-full object-cover z-[-1]"
          >
            <source src={NatureVid} type="video/mp4" />
          </video>
          <Hero />
        </div>
        <Places handleOrderPopup={handleOrderPopup} />
        <BannerPic img={BannerImg} />
        {/* <BlogsComp /> */}
        <Banner />
        <BannerPic img={Banner2} />
        {/* <Testimonial /> */}
        {/* <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
      </div>
    </>
  );
};

export default Home;
