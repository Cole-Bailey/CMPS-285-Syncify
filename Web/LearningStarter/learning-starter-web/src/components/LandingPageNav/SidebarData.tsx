import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Calendar',
    path: '/calendar',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Todos',
    path: '/to-dos',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Events',
    path: '/',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Shopping Lists',
    path: '/shopping-lists',
    icon: <IoIcons.IoMdCart />,
    cName: 'nav-text'
  },
  {
    title: 'Recipes',
    path: '/recipes',
    icon: <IoIcons.IoMdNutrition />,
    cName: 'nav-text'
  },
  {
    title: '...',
    path: '/',
    icon: <AiIcons.AiFillThunderbolt />,
    cName: 'nav-text'
  },
];