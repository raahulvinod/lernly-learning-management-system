'use client';

import { useState } from 'react';

import Topbar from '@/app/components/Admin/topbar/Topbar';
import EditCategories from '../../components/Admin/customization/EditCategories';

type Props = {};

const page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[85%]">
      <Topbar open={open} setOpen={setOpen} />
      <EditCategories />
    </div>
  );
};

export default page;
