import { MdCheck } from 'react-icons/md';
import { FiClock, FiTag, FiBook, FiGlobe } from 'react-icons/fi';
import { useSelector } from 'react-redux';

import { Course } from './Courses';
import Ratings from '@/app/utils/Ratings';
import CoursePlayer from '../Admin/course/CoursePlayer';

interface CourseDataProps {
  courseData: Course;
}

const CourseDetails: React.FC<CourseDataProps> = ({ courseData }) => {
  const { user } = useSelector((state: any) => state.auth);
  console.log('user: ' + user);

  console.log(courseData);

  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === courseData._id);

  const handleOrder = (e: any) => {};

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
      <div className="px-20">
        <div className="bg-white">
          <div className="container mx-auto flex flex-wrap relative">
            {/* Course Details */}
            <div className="w-full lg:w-2/3">
              <header className="bg-white py-6">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {courseData.name}
                </h1>
                <p className="text-gray-500 mt-2">{courseData.description}</p>
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

              {/*TODO: Rest of the course content here */}
              {/*TODO: Add course curriculum, instructor information, reviews */}

              {/* What You'll Learn Section */}
              <section className="py-4 border bg-white border-gray-300 rounded p-4 mr-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
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
              <section className="py-4  bg-white border-gray-300 rounded p-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
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
            </div>

            {/* Fixed Right-side Box */}
            <div className="w-full lg:w-1/3 lg:flex-none">
              <div className="sticky top-10">
                <div className="bg-white rounded-lg shadow-md p-4">
                  {/* Course Video */}
                  <div className="mb-4">
                    {/* course video player */}
                    <CoursePlayer
                      videoUrl={courseData?.demoUrl}
                      title={courseData?.name}
                    />
                  </div>

                  {/* Price Details */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 ">
                      <p className="text-xl font-semibold text-black">
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

                  {/* Buy Now Button */}
                  <button className="bg-[crimson] text-white py-2 px-4 rounded-lg w-full mb-4">
                    Buy Now
                  </button>

                  {/* Coupon Input */}
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    className="w-full bg-gray-200 p-2 rounded-lg mb-2"
                  />

                  {/* Apply Coupon Button */}
                  <button className="bg-[#37a39a] text-white py-2 px-4 rounded-lg w-full mb-2">
                    Apply Coupon
                  </button>

                  {/* 30-Day Money-Back Guarantee */}
                  <p className="text-sm text-gray-500 mb-2 text-center">
                    30-Day Money-Back Guarantee
                  </p>

                  {/* Full-Time Access */}
                  <p className="text-sm text-gray-500 text-center">
                    Full-Time Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
