'use client';

import { useEffect } from 'react';

import { Course } from '@/app/components/course/Courses';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import Loader from '@/app/components/Loader/Loader';
import CourseContent from '@/app/components/course/CourseContent';

interface CourseAccessProps {}

const page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const { isLoading, data, error } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (course: Course) => course._id === id
      );

      if (!isPurchased) {
        redirect('/');
      }

      if (error) {
        redirect('/');
      }
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent courseId={id} userData={data.user} />
        </div>
      )}
    </>
  );
};

export default page;
