'use client';

import { useState } from 'react';

import Topbar from '@/app/components/Admin/topbar/Topbar';
import EditFaq from '../../components/Admin/customization/EditFaq';

type Props = {};

const page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-[85%] ml-12">
      <Topbar open={open} setOpen={setOpen} />
      <EditFaq />
    </div>
  );
};

export default page;
