import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { IoMdAddCircle } from 'react-icons/io';

import { styles } from '@/app/styles/style';
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import AdminHeader from '../topbar/AdminHeader';
import toast from 'react-hot-toast';
import Loader from '../../Loader/Loader';

const EditFaq = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('FAQ', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }

    if (isSuccess) {
      refetch();
      toast.success('FAQ updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  // function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === '' || q.answer === '');
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: 'FAQ',
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] 800px:w-[80%] mt-[20px] h-screen">
          <AdminHeader title="FAQ" subtitle="Edit FAQ" />
          <div className="mt-12">
            <dl className="space-y-8">
              {questions.map((question: any) => (
                <div
                  key={question._id}
                  className={`${
                    question._id !== question[0]?._id && 'border-t'
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <button
                      className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                      onClick={() => toggleQuestion(question._id)}
                    >
                      <input
                        className={`${styles.input} border-none`}
                        value={question.question}
                        onChange={(e: any) =>
                          handleQuestionChange(question._id, e.target.value)
                        }
                        placeholder="Add your question"
                      />
                      <span className="ml-6 flex-shrink-0">
                        {question.active ? (
                          <HiMinus className="h-6 w-6" />
                        ) : (
                          <HiPlus className="h-6 w-6" />
                        )}
                      </span>
                    </button>
                  </dt>
                  {question.active && (
                    <dd className="mt-2 pr-12 relative">
                      <input
                        className={`${styles.input} border-none`}
                        value={question.answer}
                        onChange={(e) =>
                          handleAnswerChange(question._id, e.target.value)
                        }
                        placeholder="Add your answer"
                      />
                      <span className="flex-shrink-0 flex justify-end absolute bottom-0 right-0">
                        <AiOutlineDelete
                          className="dark:text-white text-black text-[18px] cursor-pointer"
                          onClick={() =>
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter(
                                (item) => item._id !== question._id
                              )
                            )
                          }
                        />
                      </span>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <br />
            <br />
            <IoMdAddCircle
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newFaqHandler}
            />
          </div>

          <div className="flex justify-end mr-8">
            <div
              className={`px-7 py-3 w-full bg-[#3da58a] hover:bg-[#4cceac] text-white text-center rounded-md shadow-md block sm:w-auto ${
                areQuestionsUnchanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? 'hidden'
                  : 'block cursor-pointer'
              }`}
              onClick={
                areQuestionsUnchanged(data?.layout?.faq, questions) ||
                isAnyQuestionEmpty(questions)
                  ? () => null
                  : handleEdit
              }
            >
              Save changes
            </div>
            <br />
          </div>
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default EditFaq;
