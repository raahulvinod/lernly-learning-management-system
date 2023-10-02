'use client';

import { useState } from 'react';

import Heading from '../utils/Heading';
import Header from '../components/Header';
import Protected from '../hooks/useProtected';

type Props = {};

const page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');

  return (
    <div>
      <Protected>
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
      </Protected>
    </div>
  );
};

export default page;
