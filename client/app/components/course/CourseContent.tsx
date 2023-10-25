import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import { useState } from 'react';
import CourseContentMedia from './CourseContentMedia';

interface CourseContentProps {
  courseId: string;
}

const CourseContent: React.FC<CourseContentProps> = ({ courseId }) => {
  const { data: { content } = {}, isLoading } =
    useGetCourseContentQuery(courseId);

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full grid grid-cols-10">
          <Heading
            title={content[activeVideo]?.title}
            description=" 
        Explore a world of knowledge with our learnly eLearning platform. 
        Join educators and learners worldwide on a journey of discovery."
            keywords={content[activeVideo]?.tags}
          />
          <div className="col-span-7">
            <CourseContentMedia
              courseData={content}
              courseId={courseId}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseContent;
