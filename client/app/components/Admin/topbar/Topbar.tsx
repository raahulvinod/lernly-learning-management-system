'use client';

import { useState } from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import ThemeSwitcher from '@/app/utils/ThemeSwitcher';

type Props = {};

const Topbar: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-50% flex justify-end p-6 fixed right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <NotificationsOutlinedIcon className="text-2xl cursor-pointer dark:text:white text-black dark:text-white relative" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          2
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[65vh] dark:bg-[#111c43] bg-white shadow-xl absolute top-16 rounded max-w-sm my-4 divide-y divide-gray-100 overflow-hidden text-base">
          <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            Notifications
          </div>
          <div>
            <a
              href="#"
              className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  New message from{' '}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  : "Hey, what's up? All set for the presentation?"
                </div>
                <div className="flex justify-between">
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                    a few moments ago
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer">
                    Mark as read
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div className="flex-shrink-0"></div>
              <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Jese leos
                  </span>{' '}
                  and{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    5 others
                  </span>{' '}
                  started following you.
                </div>
                <div className="flex justify-between">
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                    10 minutes ago
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer">
                    Mark as read
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div className="flex-shrink-0"></div>
              <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Joseph Mcfall
                  </span>{' '}
                  and{' '}
                  <span className="font-medium text-gray-900 dark:text-white">
                    141 others
                  </span>{' '}
                  love your story. See it and view more stories.
                </div>
                <div className="flex justify-between">
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                    44 minutes ago
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer">
                    Mark as read
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
            >
              <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Leslie Livingston
                  </span>{' '}
                  mentioned you in a comment:{' '}
                  <span className="font-medium text-primary-700 dark:text-primary-500">
                    @bonnie.green
                  </span>{' '}
                  what do you say?
                </div>
                <div className="flex justify-between">
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                    1 hour ago
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer">
                    Mark as read
                  </div>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <div className="flex-shrink-0"></div>
              <div className="w-full pl-3">
                <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    Robert Brown
                  </span>{' '}
                  posted a new video: Glassmorphism - learn how to implement the
                  new design trend.
                </div>
                <div className="flex justify-between">
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                    3 hour ago
                  </div>
                  <div className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer">
                    Mark as read
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Topbar;
