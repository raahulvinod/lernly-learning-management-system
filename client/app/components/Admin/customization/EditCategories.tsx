import { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import toast from 'react-hot-toast';

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import AdminHeader from '../topbar/AdminHeader';
import Loader from '../../Loader/Loader';
import { styles } from '@/app/styles/style';

const EditCategories = () => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }

    if (isSuccess) {
      refetch();
      toast.success('Categories updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((category: any) =>
        category._id === id ? { ...category, title: value } : category
      )
    );
  };

  const addNewCategory = () => {
    if (categories[categories.length - 1].title === '') {
      toast.error('Category title cannot be empty');
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: '' }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category) => category.title === '');
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: 'Categories',
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="ml-12 mt-[60px]">
          <AdminHeader title="CATEGORIES" subtitle="All categories" />
          {categories.map((category: any, index: number) => {
            return (
              <div className="p-3">
                <div className="flex items-center w-full justify-center">
                  <input
                    className={`${styles.input} !border-none !text-[20px]`}
                    value={category.title}
                    placeholder="Enter category title..."
                    onChange={(e) =>
                      handleCategoriesAdd(category._id, e.target.value)
                    }
                  />
                  <AiOutlineDelete
                    className="dark:text-white text-black text-[18px] cursor-pointer"
                    onClick={() =>
                      setCategories((prevCategory: any) =>
                        prevCategory.filter(
                          (prevCat: any) => prevCat._id !== category._id
                        )
                      )
                    }
                  />
                </div>
              </div>
            );
          })}
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircle
              className="dark:text-white text-black text-[50px] cursor-pointer"
              onClick={addNewCategory}
            />
          </div>

          <div className="flex justify-end mr-8">
            <div
              className={`px-7 py-3 w-full bg-[#3da58a] hover:bg-[#4cceac] text-white text-center rounded-md shadow-md block sm:w-auto ${
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? 'hidden'
                  : 'block cursor-pointer'
              }`}
              onClick={
                areCategoriesUnchanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save changes
            </div>
          </div>
          <br />
          <br />
        </div>
      )}
    </>
  );
};

export default EditCategories;
