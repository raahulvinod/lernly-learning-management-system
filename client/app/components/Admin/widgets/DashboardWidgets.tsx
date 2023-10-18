import { BiBorderLeft } from 'react-icons/bi';
import UserAnalytics from '../analytics/UserAnalytics';
import { PiUsersFourLight } from 'react-icons/pi';
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../analytics/OrdersAnalytics';
import AllInvoices from '../orders/AllInvoices';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: React.FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: -1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </Box>
  );
};

const DashboardWidgets: React.FC<Props> = ({ open, value }) => {
  return (
    <div className="mt-[30px]">
      <div className="grid grid-cols-3 gap-10">
        <div className="p-4 col-span-2">
          <UserAnalytics isDashboard={true} />
        </div>

        <div className="pt-[80px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[30px] text-[#000]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  120
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4 dark:text-white">+120</h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  450
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4 dark:text-white">+120</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="p-4 col-span-2">
          <OrdersAnalytics isDashboard={true} />
        </div>
        <div className="p-4 col-span-1">
          <h5 className="dark:text-white text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
