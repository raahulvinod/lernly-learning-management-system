'use client';

import { useState } from 'react';

import Topbar from '@/app/components/Admin/topbar/Topbar';
import AllUsers from '@/app/components/Admin/users/AllUsers';

type Props = {};

const page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[85%]">
      <Topbar open={open} setOpen={setOpen} />
      <AllUsers isTeam={false} open={open} />
    </div>
  );
};

export default page;
