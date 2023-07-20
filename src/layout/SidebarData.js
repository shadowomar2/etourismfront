import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GIIcons from 'react-icons/gi';
import * as BIIcons from 'react-icons/bi';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Tours',
    path: '/alltours',
    icon: <BIIcons.BiTrip />,
    cName: 'nav-text'
  },

  {
    title: 'Events',
    path: '/allevents',
    icon: <GIIcons.GiPartyPopper />,
    cName: 'nav-text'
  },
  {
    title: 'Restaurants',
    path: '/allrestaurants',
    icon: <BIIcons.BiRestaurant />,
    cName: 'nav-text'
  },
  {
    title: 'Hotels',
    path: '/allhotels',
    icon: <FaIcons.FaHotel />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users',
    icon: <FaIcons.FaUsers/>,
    cName: 'nav-text'
  },
  {
    title: 'Logout', 
    path: '/logout',
    icon: <BIIcons.BiLogOutCircle/>,
    cName: 'nav-text'
  }
];