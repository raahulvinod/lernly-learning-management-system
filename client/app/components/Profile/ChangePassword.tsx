import { styles } from '@/app/styles/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {};

const ChangePassword: React.FC<Props> = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordHandler = async (e: any) => {
    e.preventDefault();

    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      toast.error('Please fill input the fields');
    }

    if (newPassword !== confirmPassword) {
      toast.error('Password do not match');
    } else {
      await updatePassword({ newPassword, oldPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full pl-7 800px:px-5 800px:pl-10">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="dark:text-white block pb-2">Old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 dark:text-white ">New password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 dark:text-white ">
              Confirm password
            </label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 `}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border bg-[crimson] border-[crimson] text-center text-[#fff] rounded-[3px] mt-8 cursor-pointer`}
              type="submit"
              required
              value="Updated"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
