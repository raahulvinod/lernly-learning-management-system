'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';

import SidebarProfile from './SidebarProfile';
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import ProfileInfo from './ProfileInfo';
import ChangePassword from './ChangePassword';
import { UserData } from '../course/CourseContentMedia';
import CourseCard from '../course/CourseCard';
import { Course } from '../course/Courses';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';

type Props = {
  user: UserData;
};

const Profile: React.FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);

  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: Course) =>
          data.courses.find((course: Course) => course._id === userCourse._id)
        )
        .filter((course) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-60px 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] dark:shadow-sm shadow-sm mt-[80px] bm-[80px] sticky ${
          scroll ? 'top-[120px]' : 'top-[30px]'
        } left-[30px]`}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <div className="ml-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
            {courses &&
              courses.map((course: Course, index: number) => (
                <CourseCard course={course} key={index} />
              ))}
          </div>
          {courses.length === 0 && (
            <h1 className="text-center dark:text-white font-Poppins text-[18px]">
              You don't have any purchased courses.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
