'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from 'react-icons/ai';
import Image from 'next/image';

import CoursePlayer from '../Admin/course/CoursePlayer';
import {
  useAddNewQuestionMutation,
  useAddQuestionAnswerMutation,
  useAddReviewMutation,
  useGetCourseDetailsQuery,
} from '@/redux/features/courses/coursesApi';
import CommentReply from './questions/CommentReply';
import Reviews from './Reviews/Reviews';

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

export interface CommentData {
  user: UserData;
  question: string;
  questionReplies?: CommentData[];
  createdAt: any;
  _id: string;
}

export interface CourseData {
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
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState('');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [reviewId, setReviewId] = useState('');

  const { data: { course } = {}, refetch: refetchCourse } =
    useGetCourseDetailsQuery(courseId, {
      refetchOnMountOrArgChange: true,
    });
  // console.log(course);
  // console.log(courseData);
  const [addNewQuestion, { isSuccess, error, isLoading }] =
    useAddNewQuestionMutation();

  const [
    addQuestionAnswer,
    {
      isSuccess: addAnswerSuccess,
      isLoading: questionCreationLoading,
      error: addAnswerError,
    },
  ] = useAddQuestionAnswerMutation();

  const isReviewExists = course?.reviews?.find(
    (review: any) => review.user._id === userData._id
  );

  const [
    addReview,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewMutation();

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

  const handleAnswerSubmit = () => {
    addQuestionAnswer({
      answer,
      courseId,
      contentId: courseData[activeVideo]._id,
      questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error('Review cant be empty.');
    } else {
      addReview({ review, rating, courseId });
    }
  };

  const handleReviewReplySubmit = () => {};

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

    if (addAnswerSuccess) {
      setAnswer('');
      refetch();
      toast.success('Answer added successfully.');
    }

    if (addAnswerError) {
      if ('data' in addAnswerError) {
        const errorMessage = addAnswerError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewSuccess) {
      setReview('');
      setRating(1);
      refetchCourse();
      toast.success('Review added successfully');
    }

    if (reviewError) {
      if ('data' in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    addAnswerSuccess,
    addAnswerError,
    reviewSuccess,
    reviewError,
  ]);

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
                <h2 className="800px:text-[20px] 800px:inline-block font-normal dark:text-white">
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
                src={
                  userData.avatar
                    ? userData.avatar.url
                    : 'https://res.cloudinary.com/dxypazeq8/image/upload/v1698515476/avatars/adzae3s5ffkbfmrrfmhj.png'
                }
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
            <div className="w-full h-[1px] dark:bg-[#ffffff3b] dark:text-white"></div>
            <div>
              {/* question replay */}
              <CommentReply
                courseData={courseData}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                questionId={questionId}
                setQuestionId={setQuestionId}
                handleAnswerSubmit={handleAnswerSubmit}
                userData={userData}
                questionCreationLoading={questionCreationLoading}
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
                      src={
                        userData.avatar
                          ? userData.avatar.url
                          : 'https://res.cloudinary.com/dxypazeq8/image/upload/v1698515476/avatars/adzae3s5ffkbfmrrfmhj.png'
                      }
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
                      disabled={reviewCreationLoading}
                      className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-12 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                        reviewCreationLoading && 'bg-blue-400'
                      }`}
                      onClick={
                        reviewCreationLoading ? () => {} : handleReviewSubmit
                      }
                    >
                      {reviewCreationLoading ? 'Submitting...' : 'Submit'}
                    </button>
                  </div>
                  <br />
                  <div className="w-full h-[1px] bg-[#ffffff3b] dark:text-white"></div>
                </>
              )}
            </>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              {course?.reviews &&
                [...course.reviews].reverse().map((review, index: number) => (
                  <div className="w-full my-5" key={index}>
                    <Reviews
                      review={review}
                      userData={userData}
                      reviewId={reviewId}
                      setReviewId={setReviewId}
                      handleReviewReplySubmit={handleReviewReplySubmit}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContentMedia;
