'use client';

import socketIO from 'socket.io-client';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import ThemeSwitcher from '@/app/utils/ThemeSwitcher';
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from '@/redux/features/notifications/notificationApi';
import { useEffect, useState } from 'react';
import { format } from 'timeago.js';

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

export interface Notification {
  _id: string;
  title: string;
  message: string;
  status: string;
  createdAt: string;
}

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Topbar: React.FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();

  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create Audio instance only in the browser environment
      setAudio(
        new Audio(
          'https://res.cloudinary.com/dxypazeq8/video/upload/v1706945775/livechat-129007_afxnj7.mp3'
        )
      );
    }
  }, []);

  const playerNotificationSound = () => {
    if (audio) {
      audio.play();
    }
  };

  useEffect(() => {
    if (data) {
      const unreadNotifications = data.notification.filter(
        (notification: Notification) => notification.status === 'unread'
      );
      setNotifications(unreadNotifications);
    }

    if (isSuccess) {
      refetch();
    }

    if (audio) {
      audio.load();
    }
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on('newNotification', (data) => {
      if (data) {
        refetch();
      }
      playerNotificationSound();
    });
  }, [refetch]);

  const handleNotificationChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-50% flex justify-end p-6 fixed right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <NotificationsOutlinedIcon className="text-2xl cursor-pointer dark:text:white text-black dark:text-white relative" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>

      {open && (
        <div className="w-[350px] h-[65vh] dark:bg-[#111c43] bg-white shadow-xl absolute z-50 top-16 rounded max-w-sm my-4 divide-y divide-gray-100 overflow-hidden text-base">
          <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            Notifications
          </div>
          {notifications &&
            notifications.map((notified: any, index: number) => (
              <div key={index}>
                <a
                  href="#"
                  className="flex px-4 py-3 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                >
                  <div className="w-full pl-3">
                    <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
                      {/* New message from{' '} */}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {notified.title}
                      </span>
                      : {notified.message}
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs font-medium text-primary-700 dark:text-gray-500">
                        {format(notified.createdAt)}
                      </div>
                      <div
                        onClick={() => handleNotificationChange(notified._id)}
                        className="text-xs font-medium text-primary-700 dark:text-gray-500 cursor-pointer"
                      >
                        Mark as read
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Topbar;
