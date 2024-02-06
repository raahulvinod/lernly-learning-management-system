'use client';

import AllInvoices from '@/app/components/Admin/orders/AllInvoices';
import Topbar from '@/app/components/Admin/topbar/Topbar';
import { useState } from 'react';

type Props = {};

const Page: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[85%] ml-12">
      <Topbar open={open} setOpen={setOpen} />
      <AllInvoices isDashboard={false} open={open} />
    </div>
  );
};

export default Page;
