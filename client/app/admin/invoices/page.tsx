'use client';

import AllInvoices from '@/app/components/Admin/orders/AllInvoices';

type Props = {};

const page: React.FC<Props> = () => {
  return (
    <div className="w-[85%] ml-12">
      <AllInvoices isDashboard={false} />
    </div>
  );
};

export default page;
