'use client';

import { useState } from 'react';

import Heading from '@/app/utils/Heading';
import UserAnalytics from '@/app/components/Admin/analytics/UserAnalytics';
import Topbar from '@/app/components/Admin/topbar/Topbar';

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Topbar setOpen={setOpen} open={open} />
      <UserAnalytics />
    </div>
  );
};

export default Page;
