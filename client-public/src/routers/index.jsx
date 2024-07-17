// AppRouter.js
import React from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../view/BaseLayout";
import Home from "../view/Home";
import Blogs from "../view/Blogs";
import PlacesRoute from "../view/PlacesRoute";
import About from "../view/About";
import BlogsDetails from "../view/BlogsDetail";
import GoogleMap from "../components/BlogComp"; 
import Login from "../view/Login"
import Register from "../view/Register"
import Customize from "../view/customize"
import MyTrip from "../view/MyTrip"
import Toastify from "toastify-js"
const url = "http://localhost:3000"

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register url={url} />
  },
  {
    path: "/login",
    element: <Login url={url} />,
    loader: () => {
      if (localStorage.access_token) {
          Toastify({
              text: "You already logged in",
              duration: 2000,
              newWindow: true,
              close: true,
              gravity: "top",
              position: "left",
              stopOnFocus: true,
              style: {
                  background: "#EF4C54",
                  color: "#17202A",
                  boxShadow: "0 5px 10px black",
                  fontWeight: "bold"
              }
          }).showToast();
          return redirect('/')
      }

      return null
  },
  },
  {
    path: "/customize",
    element: <Customize url={url} />,
  },
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.access_token) {
        Toastify({
          text: "Please log in first",
          duration: 2000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "#EF4C54",
            color: "#17202A",
            boxShadow: "0 5px 10px black",
            fontWeight: "bold",
          },
        }).showToast();
        return redirect("/login");
      }

      return null
    },
    children: [
      {
        path: "/",
        element: <Home url={url} />,
      },
      {
        path: "/blogs",
        element: <Blogs url={url} />,
      },
      {
        path: "/blogs/:id",
        element: <BlogsDetails url={url} />,
      },
      {
        path: "/best-places",
        element: <PlacesRoute url={url} />,
      },
      {
        path: "/about",
        element: <About url={url} />,
      },
      {
        path: "/map",
        element: <GoogleMap url={url} />,
      },
      {
        path: "/my-trips",
        element: <MyTrip url={url} />,
      },
    ],
  },
]);


export default router;
