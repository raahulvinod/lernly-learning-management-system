'use client';

import { useState } from 'react';

import Heading from '../utils/Heading';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

import Profile from '../components/Profile/Profile';
import Protected from '../hooks/useProtected';

type Props = {};

const page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} Profile - Learnly online courses`}
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
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default page;
