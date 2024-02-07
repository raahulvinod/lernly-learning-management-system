import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';
import AdminHeader from '../topbar/AdminHeader';
import Loader from '../../Loader/Loader';

type Props = {};

const EditHero: React.FC<Props> = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const { data, refetch, isLoading } = useGetHeroDataQuery('Banner', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }

    if (isSuccess) {
      refetch();
      toast.success('Hero updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: 'Banner',
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="px-12 mt-[20px]">
            <AdminHeader
              title="CUSTOMIZATION"
              subtitle="Customize your hero section"
            />
          </div>
          <div className="mx-auto max-w-screen-xl px-4 items-center lg:flex md:px-8 ">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left">
              <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                A world of learning from{' '}
                <span className="text-[crimson]">₹449</span>
              </p>
              <h1 className="dark:text-white text-black font-bold text-4xl xl:text-5xl">
                <textarea
                  className="dark:text-white resize-none text-black p-2"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  rows={2}
                ></textarea>
              </h1>
              <p className="dark:text-gray-300 text-black max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                <textarea
                  className="dark:text-white resize-none text-black w-full p-2"
                  placeholder="Enter subtitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                ></textarea>
              </p>
              <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                <a
                  href="#"
                  className="px-7 py-3 w-full  bg-[crimson] text-white  text-center rounded-md shadow-md block sm:w-auto"
                >
                  Explore courses
                </a>
                <a
                  href="#"
                  className="px-7 py-3 w-full text-gray-800 text-center rounded-md block sm:w-auto transition-colors duration-200 hover:text-deep-purple-accent-700 dark:text-[#37a39a]"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3 relative h-50 -z-50">
              <img
                src={image}
                className="w-full mx-auto sm:w-10/12  lg:w-full"
              />
            </div>
            <div>
              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-[40] right-10 z-20"
              >
                <AiOutlineCamera
                  size={25}
                  className="dark:text-white text-black text-[18px] cursor-pointer"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-end mr-8">
            <button
              className={`px-7 py-3 w-full bg-[#3da58a] hover:bg-[#4cceac] text-white text-center rounded-md shadow-md block sm:w-auto ${
                data?.layout?.banner.title !== title ||
                data?.layout?.banner.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? 'block'
                  : 'hidden'
              }`}
              onClick={
                data?.layout?.banner.title !== title ||
                data?.layout?.banner.subTitle !== subTitle ||
                data?.layout?.banner?.image?.url !== image
                  ? handleEdit
                  : () => null
              }
            >
              Save changes
            </button>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default EditHero;
