'use client';

import React, {  useState } from 'react';

import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/course/Courses';
import Faq from './components/faq/Faq';
import Footer from './components/Footer';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="Learnly"
        description=" 
        Explore a world of knowledge with our learnly eLearning platform. 
        Join educators and learners worldwide on a journey of discovery."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Faq />
      <Footer />
    </div>
  );
};

export default Page;
