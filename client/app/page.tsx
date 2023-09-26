'use client';

import { useState } from 'react';

import Header from './components/Header';
import Heading from './utils/Heading';

interface Props {}

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [aciveItem, setAciveItem] = useState(0);

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
      <Header open={open} setOpen={setOpen} activeItem={aciveItem} />
    </div>
  );
};

export default Page;
