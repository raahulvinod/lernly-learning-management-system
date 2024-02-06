'use client';

import { useState } from 'react';

import EditHero from '@/app/components/Admin/customization/EditHero';
import Topbar from '@/app/components/Admin/topbar/Topbar';
import Heading from '@/app/utils/Heading';

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Topbar open={open} setOpen={setOpen} />
      <EditHero />
    </div>
  );
};

export default Page;
