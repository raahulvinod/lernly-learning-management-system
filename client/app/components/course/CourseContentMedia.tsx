import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import CoursePlayer from '../Admin/course/CoursePlayer';
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from 'react-icons/ai';
import Image from 'next/image';
import {
  useAddNewQuestionMutation,
  useGetCourseDetailsQuery,
} from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';

export interface UserData {
  _id: string;
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
  userData: UserData;
  refetch: any;
}

const CourseContentMedia: React.FC<CourseContentMediaProps> = ({
  courseData,
  courseId,
  activeVideo,
  setActiveVideo,
  userData,
  refetch,
}) => {
  //   console.log(courseData);
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerId, setAnswerId] = useState('');

  const { data } = useGetCourseDetailsQuery(courseId);
  //   console.log(data);
  console.log(courseData);
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();

  const isReviewExists = data?.reviews?.find(
    (review: any) => review.user._id === userData._id
  );

  const handleQuestion = () => {
    if (question === '') {
      toast.error('Question cant be empty');
    } else {
      addNewQuestion({
        question,
        courseId,
        contentId: courseData[activeVideo]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {};

  useEffect(() => {
    if (isSuccess) {
      setQuestion('');
      refetch();
      toast.success('Question added successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={courseData[activeVideo]?.title}
        videoUrl={courseData[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 md:px-4 text-center inline-flex items-center md:mr-2 mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && '!cursor-no-drop opacity-[0.8]'
          }`}
          onClick={() =>
            activeVideo === 0 ? 0 : setActiveVideo(activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="md:mr-2" />
          <span className="hidden md:block">Prev lecture</span>
        </div>
        <div
          className={`text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 md:px-4 text-center inline-flex items-center md:mr-2 mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 !min-h-[40px] !py-[unset] ${
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
          <span className="hidden md:block">Next lecture</span>
          <AiOutlineArrowRight className="md:ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white">
        {courseData[activeVideo]?.title}
      </h1>
      <br />
      <div className="border dark:border-none">
        <div className="p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
          {['Overview', 'Resourses', 'Q & A', 'Reviews'].map((text, index) => (
            <h5
              key={index}
              className={`800px:text-[20px] cursor-pointer ${
                activeBar === index
                  ? 'text-[crimson]'
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
        {activeBar === 2 && (
          <>
            <div className="flex w-full">
              <Image
                src={userData.avatar ? userData.avatar.url : ''}
                width={50}
                height={50}
                alt="user profile"
                className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
              />
              <textarea
                name=""
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                id=""
                cols={40}
                rows={5}
                placeholder="Ask your question..."
                className="outline-none bg-transparent ml-3 p-2 border boarder-[#ffffff57] 800px:w-[90%] 800px:text-[18px] mb-4"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={questionCreationLoading}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={questionCreationLoading ? () => {} : handleQuestion}
              >
                Submit
              </button>
            </div>
            <br />
            <div className="w-full h-[1px] bg-gray-200 dark:bg-[#ffffff3b] dark:text-white"></div>
            <div>
              {/* question replay */}
              <CommentReply
                courseData={courseData}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                setAnswerId={setAnswerId}
                handleAnswerSubmit={handleAnswerSubmit}
                userData={userData}
              />
            </div>
          </>
        )}
        {activeBar === 3 && (
          <div className="w-full">
            <>
              {!isReviewExists && (
                <>
                  <div className="flex w-full">
                    <Image
                      src={userData.avatar ? userData.avatar.url : ''}
                      width={50}
                      height={50}
                      alt="user profile"
                      className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
                    />
                    <div className="w-full">
                      <h5 className="pl-3 mb-2 text-[20px] font-[500] dark:text-white text-black">
                        Rate this course
                      </h5>
                      <div className="flex w-full ml-2 pb-3">
                        {[1, 2, 3, 4, 5].map((i) =>
                          rating >= i ? (
                            <AiFillStar
                              key={i}
                              className="mr-2 cursor-pointer"
                              color="rgba(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          ) : (
                            <AiOutlineStar
                              key={i}
                              className="mr-2 cursor-pointer"
                              color="rgba(246,186,0)"
                              size={25}
                              onClick={() => setRating(i)}
                            />
                          )
                        )}
                      </div>
                      <textarea
                        name=""
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        id=""
                        cols={40}
                        rows={5}
                        placeholder="Write a review..."
                        className="outline-none bg-transparent ml-3 p-2 border boarder-[#ffffff57] dark:text-white 800px:w-[90%] 800px:text-[18px] mb-4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-12 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </div>
                  <br />
                  <div className="w-full h-[1px] bg-[#ffffff3b] dark:text-white"></div>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
};

const CommentReply = ({
  courseData,
  activeVideo,
  answer,
  setAnswer,
  setAnswerId,
  handleAnswerSubmit,
  userData,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {courseData[activeVideo].questions.map(
          (question: string, index: number) => (
            <CommentItem
              key={index}
              courseData={courseData}
              activeVideo={activeVideo}
              questionData={question}
              index={index}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
            />
          )
        )}
      </div>
    </>
  );
};

const CommentItem = ({
  courseData,
  activeVideo,
  questionData,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
}: any) => {
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px] ml-2 bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
            <h1 className="uppercase text-[18px]">
              {questionData?.user.name.slice(0, 2)}
            </h1>
          </div>
          <div className="pl-3">
            <h5 className="text-md dark:text-white font-semibold">
              {questionData?.user.name}
            </h5>
            <p className="dark:text-white ">{questionData?.question}</p>
            <small className="text-black dark:text-[#ffffff83]">
              {format(questionData?.createdAt)}
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseContentMedia;
