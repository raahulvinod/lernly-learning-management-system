'use client';

import Link from 'next/link';
import React, { Component, FC, useState } from 'react';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';

import NavItems from '../utils/NavItems';
import ThemeSwitcher from '../utils/ThemeSwitcher';
import CustomModal from '../utils/CustomModal';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Verification from './Auth/Verification';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, setRoute, open }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      {
        setOpenSideBar(false);
      }
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? 'dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'
            : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div>
              <Link
                href={'/'}
                className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
              >
                Learnly
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* mobile devices */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
              <HiOutlineUserCircle
                size={25}
                className="hidden 800px:block cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        {/* mobile navigation */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024] 800px:hidden"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[60%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              <div className="flex items-center justify-center">
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 text-black dark:text-white "
                  onClick={() => setOpen(true)}
                />
                <span className="ml-1 text-[18px] font-Poppins font-[400] text-black dark:text-white">
                  Profile
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {route === 'Login' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
            />
          )}
        </>
      )}
      {route === 'Sign-Up' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Signup}
            />
          )}
        </>
      )}
      {route === 'Verification' && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
