'use client';

import Loader from '@/app/components/Loader/Loader';
import CourseDetails from '@/app/components/course/CourseDetails';
import Heading from '@/app/utils/Heading';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';

const Page = ({ params }: { params: { id: string } }) => {
  const { data, isLoading } = useGetCourseDetailsQuery(params.id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + '-Learnly'}
            description="
      Explore a world of knowledge with our learnly eLearning platform. 
      Join educators and learners worldwide on a journey of discovery."
            keywords={data?.course?.tags}
          />
          <CourseDetails courseData={data.course} />
        </div>
      )}
    </>
  );
};

export default Page;
