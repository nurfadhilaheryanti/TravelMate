import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers";
import { Provider } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import store from "./app/store";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
