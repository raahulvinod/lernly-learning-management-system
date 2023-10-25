import React, { useState } from 'react';
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
  links: [
    {
      title: string;
      url: string;
    }
  ];
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
  const [activeBar, setActiveBar] = useState(0);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={courseData[activeVideo]?.title}
        videoUrl={courseData[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 px-4 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && '!cursor-no-drop opacity-[0.8]'
          }`}
          onClick={() => (activeVideo === 0 ? 0 : activeVideo - 1)}
        >
          <AiOutlineArrowLeft className="mr-2" /> Prev Lecture
        </div>
        <div
          className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 px-4 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
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
          Next Lecture
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white">
        {courseData[activeVideo]?.title}
      </h1>
      <br />
      <div className="border">
        <div className="p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
          {['Overview', 'Resourses', 'Q & A', 'Reviews'].map((text, index) => (
            <h5
              key={index}
              className={`800px:text-[20px] cursor-pointer ${
                activeBar === index
                  ? 'text-blue-700'
                  : 'dark:text-white text-black'
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          ))}
        </div>
        <br />
        {activeBar === 0 && (
          <p className="text-[18px] p-4 whitespace-pre-line mb-3 dark:text-white text-black">
            {courseData[activeVideo]?.description}
          </p>
        )}
        {activeBar === 1 && (
          <div>
            {courseData[activeVideo]?.links.map((link, index) => (
              <div className="mb-5 p-4" key={index}>
                <h2 className="800px:text-[20px] 800px:inline-block font-sans dark:text-white">
                  {link.title && link.title + ' : '}
                </h2>
                <a className="inline-block mx-2 text-blue-500" href={link.url}>
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentMedia;
