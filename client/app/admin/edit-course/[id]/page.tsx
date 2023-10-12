'use client';

import Heading from '@/app/utils/Heading';
import EditCourse from '@/app/components/Admin/course/EditCourse';

const page = ({ params }: any) => {
  const courseId = params?.id;
  console.log(courseId);
  return (
    <div>
      <Heading
        title="Admin - Learnly"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive learnly dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <EditCourse courseId={courseId} />
    </div>
  );
};

export default page;
