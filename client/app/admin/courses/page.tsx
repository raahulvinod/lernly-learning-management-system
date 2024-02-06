'use client';

import { useState } from 'react';
import AllCourses from '@/app/components/Admin/course/AllCourses';
import Topbar from '@/app/components/Admin/topbar/Topbar';

type Props = {};

const Page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[85%]">
      <Topbar open={open} setOpen={setOpen} />
      <AllCourses open={open} />
    </div>
  );
};

export default Page;
