'use client';

import AllCourses from '@/app/components/Admin/course/AllCourses';
import EditCategories from '../../components/Admin/customization/EditCategories';

type Props = {};

const page: React.FC<Props> = () => {
  return (
    <div className="w-[85%]">
      <EditCategories />
    </div>
  );
};

export default page;
