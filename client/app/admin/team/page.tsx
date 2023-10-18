'use client';

import Topbar from '@/app/components/Admin/topbar/Topbar';
import AllUsers from '@/app/components/Admin/users/AllUsers';
import { useState } from 'react';

type Props = {};

const page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[85%]">
      <Topbar open={open} setOpen={setOpen} />
      <AllUsers isTeam={true} open={open} />
    </div>
  );
};

export default page;
