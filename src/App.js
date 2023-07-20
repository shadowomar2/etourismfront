import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Home from "./pages/Home";
import RegisterDevice from "./register/RegisterDevice";
import { Tour } from "./pages/Toursadmin/Tour";
import { Tours } from "./pages/Toursadmin/Tours";
import { NewTour } from "./pages/Toursadmin/Newtour";

import { Events } from "./pages/Eventsadmin/Events";
import { Event } from "./pages/Eventsadmin/Event";
import { NewEvent } from "./pages/Eventsadmin/Newevent";


import { Hotels } from "./pages/Hotelsadmin/Hotels";
import { Hotel } from "./pages/Hotelsadmin/Hotel";
import { NewHotel } from "./pages/Hotelsadmin/Newhotel";

import { Restaurants } from "./pages/Restaurantadmin/Restaurants";
import { Restaurant } from "./pages/Restaurantadmin/Restaurant";
import { NewRestaurant } from "./pages/Restaurantadmin/NewRestaurant";
import Lottie from 'react-lottie';
import    LoginForm   from "./pages/Auth/Login";
import   Logout  from "./pages/Auth/Logout";
import animationData from './loading-animation.json';
import { fetchData } from './axios_URL';
import  UserBookingPage from "./pages/Usersadmin/Users";

import Navbar from "./layout/Navbar";
 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [animationOptions, setAnimationOptions] = useState({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData('GET', '/check-auth', { Authorization: `Bearer ${token}` })
        .then(response => {
          setIsAuthenticated(true);
        })
        .catch(error => {
          setIsAuthenticated(false);
        })
        .finally(() => {
          // Set isLoading to false after 0.5 seconds
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);
  if (isLoading) {
    return <Lottie options={animationOptions} height={400} width={400} />;
  }
  return (
    <>
      <Router>
        {isAuthenticated ? (
          <>
        <Navbar />

   
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/alltours" element={<Tours />} />
          <Route exact path="/tours/:id" element={<Tour />} />
          <Route exact path="/tours/new" element={<NewTour />} />
          <Route exact path="/allevents" element={<Events />} />
          <Route exact path="/events/:id" element={<Event />} />
          <Route exact path="/events/new" element={<NewEvent />} />

          <Route exact path="/allhotels" element={<Hotels />} />
          <Route exact path="/hotels/:id" element={<Hotel />} />
          <Route exact path="/hotels/new" element={<NewHotel />} />

          
          <Route exact path="/allrestaurants" element={<Restaurants />} />
          <Route exact path="/restaurants/:id" element={<Restaurant />} />
          <Route exact path="/restaurants/new" element={<NewRestaurant />} />
         
          <Route exact path="/users" element={<UserBookingPage />} />
              <Route exact path="/logout" element={<Logout onLogout={() => setIsAuthenticated(false)} />} />
              <Route path="*" element={<Home />} />
        </Routes>
        </>
        ) : (
          <Routes>
            <Route path="*" element=  {<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
 
        </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
