import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from '@/redux/features/courses/coursesApi';

type Props = {
  courseId: string;
};

const EditCourse: React.FC<Props> = ({ courseId }) => {
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [editCourse, { isSuccess, error }] = useEditCourseMutation();

  const courseDetails =
    data && data.courses.find((course: any) => course._id === courseId);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Course updated successfully');
      redirect('/admin/courses');
    }

    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });

  const [benifits, setBenifits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
    },
  ]);

  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    if (courseDetails) {
      setCourseInfo({
        name: courseDetails?.name,
        description: courseDetails?.description,
        price: courseDetails?.price,
        estimatedPrice: courseDetails?.estimatedPrice,
        tags: courseDetails?.tags,
        level: courseDetails?.level,
        demoUrl: courseDetails?.demoUrl,
        thumbnail: courseDetails?.thumbnail?.url,
      });
      setBenifits(courseDetails?.benefits);
      setPrerequisites(courseDetails?.prerequisites);
      setCourseContentData(courseDetails?.courseData);
    }
  }, [courseDetails]);

  const handleSubmit = async () => {
    const formattedBenefits = benifits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // formatted course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        suggestion: courseContent.suggestion,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;

    await editCourse({ id: courseDetails?._id, data });
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benifits}
            setBenefits={setBenifits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
            isEdit={true}
          />
        )}

        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
