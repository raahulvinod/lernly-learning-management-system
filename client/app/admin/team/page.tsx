'use client';

import { useState } from 'react';

import Topbar from '@/app/components/Admin/topbar/Topbar';
import AllUsers from '@/app/components/Admin/users/AllUsers';

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[85%]">
      <Topbar open={open} setOpen={setOpen} />
      <AllUsers isTeam={true} open={open} />
    </div>
  );
};

export default Page;
