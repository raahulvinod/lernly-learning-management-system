'use client';

import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';
import Heading from '@/app/utils/Heading';
import CreateCourse from '@/app/components/Admin/course/CreateCourse';
import Topbar from '@/app/components/Admin/topbar/Topbar';

const page = () => {
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <Topbar />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
