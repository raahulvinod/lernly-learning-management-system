'use client';

import Link from 'next/link';
import { MdCheck } from 'react-icons/md';
import { FiClock, FiTag, FiBook, FiGlobe } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { AiFillLike, AiFillDislike, AiOutlineFlag } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { format } from 'timeago.js';
import { Stripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

import { Course } from './Courses';
import Ratings from '@/app/utils/Ratings';
import CoursePlayer from '../Admin/course/CoursePlayer';
import CourseContentList from './CourseContentList';
import CheckoutForm from '../payment/CheckoutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

interface CourseDataProps {
  courseData: Course;
  stripePromise: Stripe | null;
  clientSecret: string;
}

const CourseDetails: React.FC<CourseDataProps> = ({
  courseData,
  stripePromise,
  clientSecret,
}) => {
  const { data: { user } = {} } = useLoadUserQuery(undefined, {});

  const [open, setOpen] = useState(false);

  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === courseData._id);

  const handleOrder = (e: React.MouseEvent) => {
    setOpen(true);
  };

  const formatLastUpdated = (updatedAt: string): string => {
    const date = new Date(updatedAt);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const lastUpdated = formatLastUpdated(courseData.updatedAt);

  return (
    <>
      <div className="px-4 md:px-32 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-900">
          <div className="container mx-auto flex flex-wrap relative flex-col-reverse lg:flex-row">
            {/* Course Details */}
            <div className="w-full lg:w-2/3">
              <header className="bg-white dark:bg-gray-900 py-6">
                <h1 className="text-3xl font-semibold dark:text-white text-gray-900">
                  {courseData.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-300 mt-2 px-1">
                  {courseData.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-start flex-col space-y-2 md:flex-row md:items-center">
                    <Ratings rating={courseData.ratings} />
                    <span className="text-gray-500 ml-2">
                      {courseData.purchased} students
                    </span>
                  </div>
                  {courseData.purchased === 0 && (
                    <span className="bg-yellow-100 mt-4 mr-12 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="text-gray-500 mt-2 flex-col gap-1">
                  <p>
                    <FiClock className="inline-block mr-2" />
                    <strong>Last Updated:</strong> {lastUpdated}
                  </p>
                  <p>
                    <FiBook className="inline-block mr-2" />
                    <strong>Category:</strong> {courseData.categories}
                  </p>
                  <p>
                    <FiTag className="inline-block mr-2" />
                    <strong>Tags:</strong> {courseData.tags}
                  </p>
                  <p className="flex items-center">
                    <FiGlobe className="inline-block mr-2" />
                    <strong>Language:</strong> English
                  </p>
                </div>
              </header>

              {/* What You'll Learn Section */}
              <section className="py-4 border bg-white dark:bg-gray-900 dark:text-white border-gray-300 rounded p-4 mr-12">
                <h2 className="text-xl font-semibold dark:text-gray-100 text-gray-900 mb-2">
                  What You'll Learn
                </h2>
                <ul className="list-inside">
                  {courseData?.benefits?.map((benefit: any, index: number) => (
                    <li className="mb-2 flex items-start">
                      <MdCheck className="text-green-500 mr-2" />
                      {benefit?.title}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Course overview */}
              <section className="bg-white dark:bg-gray-900 py-8 mr-12">
                <div className="container mx-auto">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                      Course Overview
                    </h2>
                    <p className="text-gray-700 dark:text-gray-400">
                      Learn what this course is all about,and what you'll
                      achieve.
                    </p>
                    <CourseContentList
                      courseContent={courseData?.courseData}
                      isDemo={true}
                    />
                  </div>
                </div>
              </section>

              <section className="py-4  bg-white dark:bg-gray-900 border-gray-300 dark:text-white rounded p-4 mr-12">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Prerequisites
                </h2>
                <ul className=" list-disc list-inside">
                  {courseData?.prerequisites?.map(
                    (prerequisite: any, index: number) => (
                      <li className="mb-2">{prerequisite?.title}</li>
                    )
                  )}
                </ul>
              </section>

              {/* Reviews */}
              <section className="bg-white dark:bg-gray-900 dark:text-white py-8 mr-12">
                <div className="container mx-auto">
                  <h2 className="text-2xl font-semibold dark:text-gray-100 text-gray-900 mb-4">
                    Reviews
                  </h2>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <Ratings rating={courseData?.ratings} />
                    <div>
                      <h5 className="font-semibold mb-4 mt-2 text-lg">
                        (
                        {Number.isInteger(courseData.ratings)
                          ? courseData?.ratings.toFixed(1)
                          : courseData?.ratings.toFixed(2)}{' '}
                        ) ratings {courseData?.reviews.length} reviews
                      </h5>
                    </div>
                  </div>
                  <div className="mb-4">
                    {courseData?.reviews &&
                      [...courseData.reviews]
                        .reverse()
                        .map((review: any, index: number) => (
                          <div
                            key={index}
                            className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4"
                          >
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                                <BsPerson size={24} color="gray" />{' '}
                              </div>
                              <div className="ml-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">
                                  {review.user.name}
                                </h3>
                                <div className="text-gray-500 text-sm">
                                  {format(review.createdAt)}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 dark:text-gray-400">
                              {review.comment}
                            </p>
                            {/*rating component*/}
                            <div className="mt-2">
                              <Ratings rating={review.rating} />
                            </div>
                            <div className="mt-4">
                              <p>Was this review helpful?</p>
                              <div className="flex items-center text-gray-600 mt-2">
                                <button className="mr-2">
                                  <AiFillLike className="hover:text-blue-400" />{' '}
                                  Like
                                </button>
                                <button className="mr-2">
                                  <AiFillDislike className="hover:text-blue-400" />{' '}
                                  Dislike
                                </button>
                                <button>
                                  <AiOutlineFlag className="hover:text-red-400" />{' '}
                                  Report
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
                {/* sample content */}
                <div
                  key={1}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <BsPerson size={24} color="gray" />{' '}
                    </div>
                    <div className="ml-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-400">
                        Sreerag c
                      </h3>
                      <div className="text-gray-500 text-sm">21 October</div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-400">
                    I recently completed this course, and I must say it's one of
                    the best online courses I've ever taken. The instructor did
                    a fantastic job explaining complex React concepts in a
                    simple and understandable manner. The course content was
                    well-structured, starting from the fundamentals and
                    gradually progressing to more advanced topics. Each section
                    had practical exercises and projects, which helped me
                    reinforce what I learned.
                  </p>
                  {/*  rating component */}
                  <div className="mt-2">
                    <Ratings rating={4.5} />
                  </div>
                  <div className="mt-4">
                    <p>Was this review helpful?</p>
                    <div className="flex items-center text-gray-600 mt-2">
                      <button className="mr-2">
                        <AiFillLike className="hover:text-blue-400" /> Like
                      </button>
                      <button className="mr-2">
                        <AiFillDislike className="hover:text-blue-400" />{' '}
                        Dislike
                      </button>
                      <button>
                        <AiOutlineFlag className="hover:text-red-400" /> Report
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Fixed Right-side Box */}
            <div className="w-full lg:w-1/3 lg:flex-none mb-8">
              <div className="sticky top-16">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                  {/* Course Video */}
                  <div className="mb-4">
                    {/* course video player */}
                    <CoursePlayer
                      videoUrl={courseData?.demoUrl}
                      title={courseData?.name}
                    />
                  </div>

                  {/* Price Details */}
                  <div className="mb-4 w-[90%]">
                    <p className="text-lg font-semibold dark:text-white">
                      Preview this course
                    </p>
                    <p className="text-base font-normal pb-2 dark:text-white">
                      Get this course, plus premium support 24x7, interactive
                      sessions and more.
                    </p>
                    <div className="flex items-center gap-2 ">
                      <p className="text-xl font-semibold text-black dark:text-gray-100">
                        ₹{courseData?.price === 0 ? 'Free' : courseData?.price}
                      </p>
                      <p className="text-gray-500 line-through">
                        ₹{courseData?.estimatedPrice}
                      </p>
                    </div>
                    <p className="text-green-600">
                      Save {discountPercentagePrice}%
                    </p>
                  </div>

                  {isPurchased ? (
                    <Link
                      href={`/course-access/${courseData._id}`}
                      className="bg-[crimson] mx-auto text-white py-2 px-4 rounded-lg w-[90%] mb-4"
                    >
                      Go to course
                    </Link>
                  ) : (
                    <button
                      onClick={handleOrder}
                      className="bg-[crimson] mx-auto text-white py-2 px-4 rounded-lg w-[90%] mb-4"
                    >
                      Buy Now
                    </button>
                  )}

                  {/* Apply Coupon*/}
                  {!isPurchased && (
                    <div>
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        className="w-[90%] bg-gray-200 p-2 rounded-lg mb-2"
                      />

                      <button className="bg-[#37a39a] mx-auto text-white py-2 px-4 rounded-lg w-[90%] mb-2">
                        Apply Coupon
                      </button>

                      <p className="text-sm text-gray-500 mb-2 text-center">
                        30-Day Money-Back Guarantee
                      </p>
                      <p className="text-sm text-gray-500 text-center">
                        Full-Time Access
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          {open && (
            <div className="w-full fixed h-screen bg-[#00000036] top-0 left-0 z-50 flex items-center justify-center">
              <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
                <div className="w-full flex justify-end">
                  <IoCloseOutline
                    size={30}
                    className="text-black cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="w-full">
                  {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm setOpen={setOpen} course={courseData} />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CourseDetails;
