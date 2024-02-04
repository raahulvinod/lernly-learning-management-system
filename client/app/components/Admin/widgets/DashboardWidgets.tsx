import { BiBorderLeft } from 'react-icons/bi';
import UserAnalytics from '../analytics/UserAnalytics';
import { PiUsersFourLight } from 'react-icons/pi';
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../analytics/OrdersAnalytics';
import AllInvoices from '../orders/AllInvoices';
import { useEffect, useState } from 'react';
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from '@/redux/features/analytics/analyticsApi';

type Props = {
  open: boolean;
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
        style={{ zIndex: open ? -1 : 1 }}
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
  const [comparePercentage, setComparePercentage] = useState();
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;

          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentageChange: usersPercentChange,
          });

          setOrderComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentageChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

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
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales obtained
                </h5>
              </div>

              <div>
                <CircularProgressWithLabel
                  value={orderComparePercentage?.percentageChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4 dark:text-white">
                  {orderComparePercentage?.percentageChange > 0
                    ? '+' + orderComparePercentage?.percentageChange.toFixed(2)
                    : orderComparePercentage?.percentageChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  New users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentageChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4 dark:text-white">
                  {userComparePercentage?.percentageChange > 0
                    ? '+' + userComparePercentage?.percentageChange.toFixed(2)
                    : '-' + userComparePercentage?.percentageChange.toFixed(2)}
                  %
                </h5>
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
          <AllInvoices isDashboard={true} open={open} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
