'use client';

import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';
import Topbar from '../components/Admin/topbar/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <Topbar />
          {children}
        </div>
      </div>
    </>
  );
}
