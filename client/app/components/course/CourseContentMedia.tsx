import React from 'react';
import CoursePlayer from '../Admin/course/CoursePlayer';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface UserData {
  name: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
}

interface CommentData {
  user: UserData;
  question: string;
  questionReplies?: CommentData[];
}

interface CourseData {
  _id: string;
  title: string;
  description: string;
  videoLength: number;
  videoSection: string;
  videoUrl: string;
  links: {
    title: string;
    url: string;
  };
  questions: CommentData[];
  suggestion: string;
}

interface CourseContentMediaProps {
  courseData: CourseData[];
  courseId: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
}

const CourseContentMedia: React.FC<CourseContentMediaProps> = ({
  courseData,
  courseId,
  activeVideo,
  setActiveVideo,
}) => {
  console.log(courseData);
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={courseData[activeVideo]?.title}
        videoUrl={courseData[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3 relative">
        <div
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 px-4 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && '!cursor-no-drop opacity-[0.8]'
          }`}
          onClick={() => (activeVideo === 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev
        </div>
        <div
          className={`text-white absolute top-0 right-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 px-4 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
            courseData.length - 1 === activeVideo &&
            '!cursor-no-drop opacity-[0.8]'
          }`}
          onClick={() =>
            setActiveVideo(
              courseData && courseData.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default CourseContentMedia;
