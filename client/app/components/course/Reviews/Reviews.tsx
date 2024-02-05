'use client';

import { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import Image from 'next/image';

import Ratings from '@/app/utils/Ratings';
import { CommentData, UserData } from '../CourseContentMedia';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useAddReviewReplyMutation } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';

interface ReviewProps {
  review: {
    comment: string;
    commentReplies: CommentData[];
    createdAt: string;
    rating: number;
    updatedAt: string;
    user: UserData;
    _id: string;
  };
  userData: UserData;
  courseId: string;
  refetchCourse: any;
}

const Reviews: React.FC<ReviewProps> = ({
  review,
  userData,
  courseId,
  refetchCourse,
}) => {
  const [replayActive, setReplayActive] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [reviewReply, setReviewReply] = useState('');

  const isRepliesVisible = replayActive && reviewId === review._id;

  const [
    addReviewReply,
    {
      isSuccess: reviewReplySuccess,
      error: reviewReplyError,
      isLoading: reviewReplyLoading,
    },
  ] = useAddReviewReplyMutation();

  const toggleReviewReplies = () => {
    if (replayActive) {
      setReplayActive(false);
    } else {
      setReplayActive(true);
      setReviewId(review._id);
    }
  };

  const handleReviewReplySubmit = () => {
    if (reviewReply === '') {
      toast.error('Comment cant be empty');
    } else {
      addReviewReply({ comment: reviewReply, courseId, reviewId });
    }
  };

  useEffect(() => {
    if (reviewReplySuccess) {
      setReviewId('');
      setReviewReply('');
      refetchCourse();
      toast.success('Review added successfully');
    }

    if (reviewReplyError) {
      if ('data' in reviewReplyError) {
        const errorMessage = reviewReplyError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [reviewReplySuccess, reviewReplyError]);

  return (
    <>
      <div className="w-full flex gap-4">
        <div className="ml-4">
          <Image
            src={
              review?.user.avatar
                ? review?.user.avatar.url
                : 'https://res.cloudinary.com/dxypazeq8/image/upload/v1698515476/avatars/adzae3s5ffkbfmrrfmhj.png'
            }
            width={50}
            height={50}
            alt="profile"
            className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
          />
        </div>
        <div className="w-[80%] ml-2 mb-2">
          <h1 className="text-lg font-semibold dark:text-gray-100">
            {review?.user.name}
          </h1>
          <Ratings rating={review.rating} />
          <p className="mt-2 dark:text-gray-300">{review.comment}</p>
          <small className="dark:text-gray-400">
            {format(review.createdAt)}
          </small>
          <div className="mt-2 text-sm cursor-pointer flex items-center dark:text-white">
            {userData.role === 'admin' ? (
              <>
                <span onClick={() => toggleReviewReplies()}>
                  {isRepliesVisible ? 'Hide replies' : 'Add reply'}
                </span>
                <BiMessage
                  size={20}
                  className="cursor-pointer text-gray-500 mt-1 ml-2"
                />
              </>
            ) : (
              <>
                {review.commentReplies.length !== 0 && (
                  <>
                    <span onClick={() => toggleReviewReplies()}>
                      {isRepliesVisible ? 'Hide replies' : 'View reply'}
                    </span>
                    <BiMessage
                      size={20}
                      className="cursor-pointer text-gray-500 mt-1 mx-2"
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        {isRepliesVisible && (
          <div
            className={`transition-all duration-300 ml-8 ${
              isRepliesVisible ? '' : 'hidden'
            }`}
          >
            {review.commentReplies.map((item: any) => (
              <div className="w-full flex 800px:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    src={item?.user.avatar ? item?.user.avatar.url : ''}
                    width={50}
                    height={50}
                    alt="user profile"
                    className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-20px font-semibold">
                      {item.user.name}
                    </h5>
                    {item.user.role === 'admin' && (
                      <VscVerifiedFilled className="text-blue-500 text-lg ml-1" />
                    )}
                  </div>
                  <p>{item.comment}</p>
                  <small className="text-black dark:text-[#ffffff83]">
                    {format(item?.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <div>
              {userData.role === 'admin' && (
                <div className="w-[85%] flex relative ml-4">
                  <input
                    type="text"
                    placeholder="reply"
                    value={reviewReply}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setReviewReply(e.target.value)
                    }
                    className="block 800px:ml-12 mt-2 outline-none text-black dark:text-white bg-transparent border-b dark:border-[#fff] p-[5px] w-[95%]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`absolute right-2 bottom-2 border p-1 px-6 rounded-md text-black dark:text-white cursor-pointer ${
                        reviewReply === '' && 'hidden'
                      }`}
                      disabled={reviewReplyLoading}
                      onClick={
                        reviewReplyLoading ? () => {} : handleReviewReplySubmit
                      }
                    >
                      {reviewReplyLoading ? 'replying...' : 'Add reply'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Reviews;
