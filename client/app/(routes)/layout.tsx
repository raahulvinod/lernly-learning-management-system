'use client';

import React, { useState } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { OpenContext } from '../context/OpenContext';

interface CourseLayoutProps {
  children: React.ReactNode;
}

const CourseLayout: React.FC<CourseLayoutProps> = ({ children }) => {
  const [route, setRoute] = useState('Login');
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={1}
        setRoute={setRoute}
        route={route}
      />
      <OpenContext.Provider value={{ setOpen }}>
        {children}
      </OpenContext.Provider>

      <Footer />
    </div>
  );
};

export default CourseLayout;
