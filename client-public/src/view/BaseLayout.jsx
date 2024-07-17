import React from "react";
import Navbar from "../components/Nav";
import { Outlet, Link } from "react-router-dom";
import Footer from "../components/Footer";
// import OrderPopup from "../components/RegisterPopup";

const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {/* <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} /> */}
    </>
  );
};

export default Layout;
