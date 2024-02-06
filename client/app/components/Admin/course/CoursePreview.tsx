import Ratings from '@/app/utils/Ratings';
import CoursePlayer from './CoursePlayer';

import { IoCheckmarkOutline } from 'react-icons/io5';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit: boolean;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto mb-5">
      <div className="w-full relative">
        <div className="bg-gray-100 dark:bg-[#111827] min-h-screen">
          <div className="w-full mt-10">
            <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.name}
            />
          </div>
          <div className="p-4 md:p-8">
            <div className="max-w-screen-xl mx-auto">
              <div className="md:flex">
                <div className="md:w-2/3 pr-4">
                  <div className="mb-4">
                    <h1 className="text-3xl font-semibold dark:text-white">
                      {courseData?.name}
                    </h1>
                    {/* <p className="text-gray-600">Course Author</p> */}
                  </div>
                  <div className="mb-4 flex gap-1 items-center">
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/013/570/330/original/illustration-of-shield-with-span-logo-suitable-for-sign-registered-verification-etc-free-vector.jpg"
                      alt="Learnly"
                      className="w-10 rounded-lg"
                    />
                    <p className="font-Poppins dark:text-white">
                      Learnly Verified
                    </p>
                  </div>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold dark:text-white">
                      {courseData?.description}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-400">
                      {courseData?.description}
                    </p>
                  </div>
                  <div className="w-full">
                    <div className="flex items-center">
                      <Ratings rating={0} />
                      <h5 className="dark:text-white font-Poppins whitespace-nowrap mt-1">
                        0 Reviews
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="mb-4">
                      <p className="text-xl font-semibold text-blue-600">
                        ₹{courseData?.price === 0 ? 'Free' : courseData?.price}
                      </p>
                      <p className="text-gray-500 line-through">
                        ₹{courseData?.estimatedPrice}
                      </p>
                      <p className="text-green-600">
                        Save {discountPercentagePrice}%
                      </p>
                    </div>
                    <button className="bg-[crimson] text-white py-2 px-4 rounded-lg w-full">
                      Buy Now
                    </button>
                    <p className="text-sm mt-4 text-gray-600">
                      30-Day Money-Back Guarantee
                    </p>
                    <p className="text-sm text-gray-600">
                      Lifetime Access • Certificate of Completion
                    </p>
                    {/* Coupon code input */}
                    <div className="mb-4 mt-4">
                      <input
                        type="text"
                        placeholder="Apply Coupon"
                        className="w-full p-2 border bg-transparent rounded focus:outline-none focus:ring focus:border-blue-300"
                      />
                      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full mt-2">
                        Apply Coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4 dark:text-white">
              <h3 className="text-xl font-semibold">What you will learn</h3>
              {courseData?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkOutline size={20} />
                  </div>
                  <p className="pl-2 dark:text-white">{item.title}</p>
                </div>
              ))}
            </div>
            <br />
            {/*  Requirements */}
            <div className="mt-4 dark:text-white">
              <h3 className="text-xl font-semibold">Requirements</h3>
              {courseData?.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkOutline size={20} />
                  </div>
                  <p className="pl-2 dark:text-white">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center cursor-pointer h-[40px] bg-[#DC143C] text-center text-[#fff] rounded mt-8"
          onClick={() => prevButton()}
        >
          Back
        </div>
        <button
          className="w-full 800px:w-[180px] flex items-center justify-center cursor-pointer h-[40px] bg-[#DC143C] text-center text-[#fff] rounded mt-8"
          onClick={() => createCourse()}
        >
          {isEdit ? 'Edit course' : 'Create course'}
        </button>
      </div>
    </div>
  );
};

export default CoursePreview;
