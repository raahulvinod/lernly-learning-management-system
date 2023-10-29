'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Searchbar = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (search === '') {
      return;
    } else {
      router.push(`/courses?title=${search}`);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="max-w-md md:w-[110%] xl:w-[200%] px-4 mx-auto"
    >
      <div className="relative" onClick={handleSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          placeholder="Search course"
          className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-3xl outline-none bg-gray-50 focus:bg-white focus:border-[crimson]"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </div>
    </form>
  );
};

export default Searchbar;
