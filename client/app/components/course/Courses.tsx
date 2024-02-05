'use client';

import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

interface Thumbnail {
  public_id: string;
  url: string;
}
interface Benefit {
  title: string;
  _id: string;
}

interface CourseData {
  title: string;
  description: string;
  videoSection: string;
  videoLength: number;
  _id: string;
}

interface Prerequisite {
  title: string;
  _id: string;
}

export interface Course {
  _id: string;
  thumbnail: Thumbnail;
  benefits: Benefit[];
  categories: string;
  courseData: CourseData[];
  createdAt: string;
  demoUrl: string;
  description: string;
  estimatedPrice: number;
  level: string;
  name: string;
  prerequisites: Prerequisite[];
  price: number;
  purchased: number;
  ratings: number;
  reviews: any[];
  tags: string;
  updatedAt: string;
  __v: number;
  success: boolean;
}

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(data?.courses);
  }, [data]);

  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <h2 className="text-2xl font-Poppins font-extrabold text-gray-900 dark:text-white">
            OUR COURSES
          </h2>
          <section className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {courses &&
              courses.map((course: Course, index: number) => (
                <CourseCard course={course} key={index} />
              ))}
          </section>
        </article>
      </section>
    </div>
  );
};

export default Courses;
