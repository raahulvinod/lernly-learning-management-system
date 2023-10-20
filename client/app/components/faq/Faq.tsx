import React, { useEffect, useState } from 'react';

import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import { off } from 'process';
import { HiMinus, HiPlus } from 'react-icons/hi';

interface FAQ {
  question: string;
  answer: string;
  _id: string;
}

const Faq = () => {
  const { data, isLoading } = useGetHeroDataQuery('FAQ', {});
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState<FAQ[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
  }, [data]);
  console.log(questions);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="w-[90%] 800px:w-[80%] mt-[20px] m-auto">
      <h1 className="text-center  font-Poppins font-semibold text-[20px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[40px] text-[#000]">
        Frequently Asked Questions
      </h1>
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
                  <span className="font-medium text-black dark:text-white justify-between w-full text-left">
                    {question.question}
                  </span>
                  <span className="ml-6 flex-shrink-0">
                    {question.active ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              {/* active qustions */}
              {activeQuestion === question._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins text-black dark:text-white">
                    {question.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Faq;
