'use client';

import React, { FC, useState } from 'react';

import Heading from './utils/Heading';
import Header from './components/Header';
import Hero from './components/Hero';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Heading
        title="Learnly"
        description="
        Elevate Learning, 
        Anywhere, Anytime. 
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
      {/* <Hero /> */}
    </div>
  );
};

export default Page;
