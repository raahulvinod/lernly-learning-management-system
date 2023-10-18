'use client';

import { useState } from 'react';
import Heading from '@/app/utils/Heading';
import OrdersAnalytics from '@/app/components/Admin/analytics/OrdersAnalytics';
import Topbar from '@/app/components/Admin/topbar/Topbar';

const page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Topbar open={open} setOpen={setOpen} />
      <OrdersAnalytics />
    </div>
  );
};

export default page;
