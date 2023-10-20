import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Course } from './Courses';
import Ratings from '@/app/utils/Ratings';

interface CourseProps {
  course: Course;
  isProfile?: boolean;
}

const CourseCard: React.FC<CourseProps> = ({ course, isProfile }) => {
  return (
    <>
      <article className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200">
        <div className="relative w-full h-50 md:h-30 lg:h-35">
          <Image
            src={course.thumbnail.url}
            alt="course thumbnail"
            width={500}
            height={300}
            className="object-cover"
          />
        </div>
        <div className="px-3 py-4">
          <h3 className="text-sm text-gray-500 pb-2">
            <Link
              className="bg-indigo-600 py-1 px-2 text-white rounded-lg"
              href={
                !isProfile
                  ? `/course/${course._id}`
                  : `/course-access/${course._id}`
              }
            >
              <span className="absolute inset-0"></span>
              {course.level}
            </Link>
          </h3>
          <p className="text-base font-bold text-gray-900 group-hover:text-indigo-600">
            {course.name}
          </p>
          <p className="text-sm font-semibold text-gray-500 group-hover:text-indigo-600">
            {course.description.slice(0, 70) + '...'}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <Ratings rating={course.ratings} />
            {/* <h5
              className={`text-black dark:text-white font-semibold ${
                isProfile && 'hidden 800px:inline'
              }`}
            >
              {course.purchased} students
            </h5> */}
          </div>
          {/* Price details */}
          <div className="flex justify-between items-center">
            <div className="text-lg text-gray-900 font-semibold mt-3">
              {course.price === 0 ? 'Free' : '₹' + course.price}
              {course.estimatedPrice && (
                <span className="text-gray-400 text-sm line-through ml-2">
                  {course.estimatedPrice === 0
                    ? ''
                    : '₹' + course.estimatedPrice}
                </span>
              )}
            </div>
            {/* Bestseller tag */}
            {course.purchased === 5 && (
              <span className="bg-yellow-100 mt-4 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                Bestseller
              </span>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default CourseCard;
