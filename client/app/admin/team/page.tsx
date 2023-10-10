'use client';

import AllUsers from '@/app/components/Admin/users/AllUsers';

type Props = {};

const page: React.FC<Props> = () => {
  return (
    <div className="w-[85%]">
      <AllUsers isTeam={true} />
    </div>
  );
};

export default page;
