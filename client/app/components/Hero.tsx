import Image from 'next/image';

import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Loader from './Loader/Loader';

const Hero = () => {
  const { data, isLoading } = useGetHeroDataQuery('Banner', {});

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="font-Poppins h-full mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
          <div className="space-y-4 flex-1 sm:text-center lg:text-left">
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
              A world of learning from{' '}
              <span className="text-[crimson]">₹449</span>
            </p>
            <h1 className="dark:text-white text-black font-bold text-4xl xl:text-5xl">
              {data?.layout?.banner?.title}
            </h1>
            <p className="dark:text-gray-300 text-black max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
              {data?.layout?.banner?.subTitle}
            </p>
            <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
              <a
                href="/courses"
                className="px-7 py-3 w-full bg-[crimson] text-white text-center rounded-md shadow-md block sm:w-auto"
              >
                Explore courses
              </a>
              <a
                href="/about"
                className="px-7 py-3 w-full text-gray-800 text-center rounded-md block sm:w-auto transition-colors duration-200 hover:text-deep-purple-accent-700 dark:text-[#37a39a]"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
            <Image
              src={data?.layout?.banner?.image?.url}
              className="w-full mx-auto sm:w-10/12 lg:w-full"
              alt="Hero"
              width={400}
              height={400}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
