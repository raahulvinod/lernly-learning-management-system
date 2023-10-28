import React, { useState } from 'react';
import Image from 'next/image';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { format } from 'timeago.js';
import { CommentData, CourseData } from '../CourseContentMedia';

interface CommentItemProps {
  courseData: CourseData[];
  activeVideo: number;
  questionData: CommentData;
  index: number;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  handleAnswerSubmit: () => void;
  questionId: string;
  setQuestionId: React.Dispatch<React.SetStateAction<string>>;
  questionCreationLoading: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  courseData,
  activeVideo,
  questionData,
  index,
  answer,
  setAnswer,
  handleAnswerSubmit,
  questionId,
  setQuestionId,
  questionCreationLoading,
}) => {
  const [replayActive, setReplayActive] = useState(false);

  const toggleReplies = () => {
    if (replayActive) {
      setReplayActive(false);
    } else {
      setReplayActive(true);
      setQuestionId(questionData._id);
    }
  };

  const isRepliesVisible = replayActive && questionId === questionData._id;

  return (
    <>
      <div className="my-4">
        <div className="hover:bg-gray-50 hover:dark:bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex mb-2">
            <div>
              <Image
                src={
                  questionData?.user.avatar ? questionData?.user.avatar.url : ''
                }
                width={50}
                height={50}
                alt="user profile"
                className="ml-2 w-[50px] h-[50px] object-cover rounded-full"
              />
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
          <div className="w-full flex items-center">
            <span
              className="800px:pl-16 text-black dark:text-[#ffffff83] cursor-pointer mr-2 ml-2"
              onClick={() => toggleReplies()}
            >
              {/* Question replies */}
              {isRepliesVisible ? 'Hide replies' : 'Add reply'}
            </span>
            <BiMessage
              size={20}
              className="cursor-pointer text-gray-500 mt-1"
            />
            <span className="pl-1 mt-[-4px] cursor-pointer text-gray-500">
              {questionData?.questionReplies?.length}
            </span>
          </div>
          {isRepliesVisible && (
            <div
              className={`transition-all duration-300 ${
                isRepliesVisible ? '' : 'hidden'
              }`}
            >
              {questionData?.questionReplies?.map((item: any) => (
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
                    <p>{item.answer}</p>
                    <small className="text-black dark:text-[#ffffff83]">
                      {format(item?.createdAt)}
                    </small>
                  </div>
                </div>
              ))}
              <div>
                <div className="w-full flex relative">
                  <input
                    type="text"
                    placeholder="reply"
                    value={answer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setAnswer(e.target.value)
                    }
                    className="block 800px:ml-12 mt-2 outline-none text-black dark:text-white bg-transparent border-b dark:border-[#fff] p-[5px] w-[95%]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`absolute right-4 bottom-1 text-black dark:text-white cursor-pointer ${
                        answer === '' && 'hidden'
                      }`}
                      disabled={questionCreationLoading}
                      onClick={
                        questionCreationLoading ? () => {} : handleAnswerSubmit
                      }
                    >
                      {questionCreationLoading ? 'replying...' : 'Add reply'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
