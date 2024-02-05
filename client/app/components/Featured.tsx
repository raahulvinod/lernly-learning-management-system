import React from 'react';
import { FaGlobe, FaBookOpen, FaUsers } from 'react-icons/fa';

const features = [
  {
    name: 'Global Access',
    description:
      'Access courses and educational content from anywhere around the globe, ensuring a seamless learning experience.',
    icon: FaGlobe,
  },
  {
    name: 'Diverse Courses',
    description:
      'Explore a wide range of courses and learning materials, catering to diverse educational interests.',
    icon: FaBookOpen,
  },
  {
    name: 'Community Collaboration',
    description:
      'Engage with a vibrant community of learners, fostering collaboration and knowledge-sharing.',
    icon: FaUsers,
  },
];

const Featured = () => {
  return (
    <div className="overflow-hidden py-4 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Discover Learnly
              </h2>
              <p className="mt-2 text-3xl dark:text-white font-bold tracking-tight text-gray-900 sm:text-4xl">
                Empowering Education
              </p>
              <p className="mt-6 text-lg dark:text-white leading-8 text-gray-600">
                Unlock the potential of online education with Learnly. Explore
                the key features that make learning with us exceptional.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900 dark:text-white">
                      {
                        <feature.icon className="inline-block mr-2 text-indigo-600" />
                      }
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline dark:text-gray-300">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Learnly Features"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
