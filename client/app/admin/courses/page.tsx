'use client';

import AllCourses from '@/app/components/Admin/course/AllCourses';

type Props = {};

const page: React.FC<Props> = () => {
  return (
    <div className="w-[85%]">
      <AllCourses />
    </div>
  );
};

export default page;
