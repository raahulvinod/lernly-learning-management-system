'use client';

import { DashboardHero } from '../components/Admin/DashboardHero';
import AdminSidebar from '../components/Admin/sidebar/AdminSidebar';
import AdminProtected from '../hooks/adminProtected';
import Heading from '../utils/Heading';

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Admin - Learnly"
          description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
          keywords="Learning, Online courses, Programming, Coding, MERN"
        />
        <div className="flex h-[200vh]">
          <DashboardHero isDashboard={true} />
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
