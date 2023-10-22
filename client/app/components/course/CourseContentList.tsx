import React, { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

interface CourseData {
  description: string;
  title: string;
  videoLength: number;
  videoSection: string;
  _id: string;
}

interface CourseContentProps {
  courseContent: CourseData[];
  activeVideo?: number;
  setActiveVideo?: (activeVideo: number) => void;
  isDemo?: boolean;
}

const CourseContentList: React.FC<CourseContentProps> = ({
  courseContent,
  activeVideo,
  setActiveVideo,
  isDemo,
}) => {
  console.log(courseContent);

  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  //find the unique video section
  const videoSections: string[] = [
    ...(Array.from(
      courseContent?.reduce(
        (set, item) => set.add(item.videoSection),
        new Set<string>()
      )
    ) as string[]),
  ];

  let totalCount: number = 0; // total count of video from previous sections

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[15px] w-full border dark:border-gray-700 rounded-lg ${
        !isDemo && 'ml-[-30px] sticky top-24 left-0 z-30'
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisbile = visibleSections.has(section);

        //fiter videos by section
        const sectionVideos: CourseData[] = courseContent.filter(
          (item) => item.videoSection === section
        );

        const sectionVideoCount: number = sectionVideos.length; // number of video in current section
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: CourseData) =>
            totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount; // start index of videos within the current section
        totalCount += sectionVideoCount; // update the total count of video

        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div className={`${!isDemo && ''}`} key={section}>
            <div className="w-full flex">
              {/* render video section */}
              <div className="w-full flex justify-between items-center bg-[#f7f9fa] dark:bg-gray-800 p-3 border dark:border-gray-700">
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {section}
                </h2>
                <div className="flex justify-end items-center gap-4">
                  <h5 className="text-black dark:text-white">
                    {sectionVideoCount} lectures{' '}
                    {sectionVideoLength < 60
                      ? sectionVideoLength
                      : sectionContentHours.toFixed(2)}{' '}
                    {sectionVideoLength > 60 ? 'Hours' : 'minutes'}
                  </h5>
                  <button
                    className="mr-4 cursor-pointer text-black dark:text-white"
                    onClick={() => toggleSection(section)}
                  >
                    {isSectionVisbile ? (
                      <BsChevronUp size={20} />
                    ) : (
                      <BsChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {isSectionVisbile && (
              <div className="w-full">
                {sectionVideos.map((item: CourseData, index: number) => {
                  const videoIndex: number = sectionStartIndex + index; // calculate the video index within the overall list
                  const contentLength: number = item.videoLength / 60;
                  return (
                    <div
                      className={`w-full ${
                        videoIndex === activeVideo ? 'bg-slate-800' : ''
                      } cursor-pointer transition-all p-2`}
                      key={item._id}
                      onClick={() =>
                        isDemo
                          ? null
                          : setActiveVideo && setActiveVideo(videoIndex)
                      }
                    >
                      <div className="flex items-center justify-between px-4">
                        <div className="flex items-center">
                          <div>
                            <MdOutlineOndemandVideo
                              size={20}
                              className="mr-4 dark:text-white"
                              color=""
                            />
                          </div>
                          <div>
                            <h1 className="text-lg inline-block break-words text-black dark:text-white">
                              {item.title}
                            </h1>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-black mr-12 dark:text-white">
                            {item.videoLength > 60
                              ? contentLength.toFixed(2)
                              : item.videoLength}{' '}
                            {item.videoLength > 60 ? 'hours' : 'minutes'}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
