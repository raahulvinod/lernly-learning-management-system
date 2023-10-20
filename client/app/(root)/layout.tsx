'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CourseLayout = ({ children }: { children: React.ReactNode }) => {
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
      {children}
      <Footer />
    </div>
  );
};

export default CourseLayout;
