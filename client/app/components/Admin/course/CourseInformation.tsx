'use client';

import { styles } from '@/app/styles/style';
import React, { useEffect, useState } from 'react';

import AdminHeader from '../topbar/AdminHeader';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
  isEdit: boolean;
};

const CourseInformation: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  isEdit,
}) => {
  const [dragging, setDragging] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const { data, isLoading, refetch } = useGetHeroDataQuery('Categories', {});

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();

    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();

    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();

    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-10">
      <AdminHeader
        title={`${isEdit ? 'EDIT COURSE' : 'CREATE COURSE'}`}
        subtitle={`${isEdit ? 'Edit course details' : 'Add course details'}`}
      />

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className={`${styles.input}`}
            placeholder="Enter course name"
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className={`${styles.input} !h-min !py-2`}
            placeholder="Enter course description"
          />
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Offer Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Enter course price"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Original Price (optional)
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Enter estimated price"
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between items-center">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Tags
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Enter course tag names... #MERN, #Next13, #TailwindCSS"
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course categories
            </label>
            <select
              name=""
              id=""
              value={courseInfo.categories}
              className={`${styles.input}`}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select category</option>
              {categories?.map((item: any) => (
                <option value={item.title} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Beginner / Intermediate / Advanced"
            />
          </div>

          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Demo URL
            </label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className={`${styles.input}`}
              placeholder="Enter demo url"
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#000] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[crimson] text-white  text-center rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
