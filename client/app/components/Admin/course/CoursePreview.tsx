import CoursePlayer from './CoursePlayer';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  return (
    <div className="w-[90%] m-auto mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>
        <div className="bg-gray-100 dark:bg-[#111827] min-h-screen">
          <div className=" p-4 md:p-8">
            <div className="max-w-screen-xl mx-auto">
              <div className="md:flex">
                <div className="md:w-2/3 pr-4">
                  <div className="mb-4">
                    <h1 className="text-3xl font-semibold dark:text-white">
                      {courseData?.name}
                    </h1>
                    {/* <p className="text-gray-600">Course Author</p> */}
                  </div>
                  <div className="mb-8">
                    <img
                      src="course-image.jpg"
                      alt="Learnly"
                      className="w-full rounded-lg"
                    />
                  </div>
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold dark:text-white">
                      {courseData?.description}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-400">
                      {courseData?.description}
                    </p>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <div className="bg-white rounded-lg shadow-lg p-4">
                    <div className="mb-4">
                      <p className="text-xl font-semibold text-blue-600">
                        ${courseData?.price === 0 ? 'Free' : courseData?.price}
                      </p>
                      <p className="text-gray-500 line-through">
                        ${courseData?.estimatedPrice}
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
                    <div className="mt-4">
                      <h3 className="text-xl font-semibold">
                        What you'll learn
                      </h3>
                      <ul className="list-disc pl-4">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
