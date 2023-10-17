'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

import Loader from '../../Loader/Loader';
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import AdminHeader from '../topbar/AdminHeader';

type Props = {
  isDashboard?: boolean;
};

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  console.log(data);

  //   const analyticsData = [
  //     { name: 'Jan 2023', count: 440 },
  //     { name: 'Feb 2023', count: 550 },
  //     { name: 'March 2023', count: 330 },
  //     { name: 'April 2023', count: 2300 },
  //     { name: 'May 2023', count: 5588 },
  //     { name: 'June 2023', count: 1440 },
  //     { name: 'July 2023', count: 4445 },
  //     { name: 'August 2023', count: 3556 },
  //     { name: 'Sept 2023', count: 732 },
  //     { name: 'October 2023', count: 4455 },
  //     { name: 'Nov 2023', count: 1044 },
  //     { name: 'December 2023', count: 4555 },
  //   ];

  const analyticsData: any = [];

  data &
    data?.orders?.last12Months.forEach((item: any) => {
      analyticsData.push({ month: item.month, orders: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen ml-12 mt-[60px]">
          <AdminHeader
            title="ORDERS ANALYTICS"
            subtitle="Last 12 months orders analytics"
          />
          <div className={`${isDashboard ? 'h-[30vh]' : 'h-screen'}`}>
            <ResponsiveContainer
              width={`${isDashboard ? '90%' : '90%'}`}
              height={`${isDashboard ? '50%' : '70%'}`}
            >
              <LineChart width={500} height={300} data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersAnalytics;
